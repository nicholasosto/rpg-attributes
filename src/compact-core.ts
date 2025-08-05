/**
 * RPG Attributes - Compact Core
 * A streamlined attribute system for Roblox-TS with Fusion integration
 * @module @trembus/rpg-attributes
 * @version 1.0.0-alpha.3-compact
 * @author Trembus
 * @license MIT
 */

import { Computed, Value, Observer } from "@rbxts/fusion";

// Core Types
export const ATTRIBUTE_KEYS = ['vitality', 'strength', 'agility', 'intellect', 'luck'] as const;
export type AttributeKey = typeof ATTRIBUTE_KEYS[number];

export interface AttributeMeta {
    displayName: string;
    description: string;
    icon: string;
    tooltip?: string;
}

export interface AttributeValues {
    baseValue: number;
    equipmentBonus: number;
    effectBonus: number;
}

export type AttributesState = {
    [key in AttributeKey]: {
        meta?: AttributeMeta;
        values: AttributeValues;
        totalValue: number;
    }
};

// Catalog Data
export const AttributeCatalog: Record<AttributeKey, AttributeMeta> = {
    vitality: {
        displayName: "Vitality",
        description: "Increases maximum health points.",
        icon: "rbxassetid://121291227474039",
        tooltip: "Higher vitality means more health and survivability"
    },
    strength: {
        displayName: "Strength", 
        description: "Increases physical damage output.",
        icon: "rbxassetid://127745571044516",
        tooltip: "Higher strength means more damage with melee weapons"
    },
    agility: {
        displayName: "Agility",
        description: "Increases movement speed and dodge chance.", 
        icon: "rbxassetid://73893872719367",
        tooltip: "Higher agility means faster movement and better evasion"
    },
    intellect: {
        displayName: "Intellect",
        description: "Increases mana pool and spell damage.",
        icon: "rbxassetid://107600003376684", 
        tooltip: "Higher intellect means more mana and stronger spells"
    },
    luck: {
        displayName: "Luck",
        description: "Increases critical hit chance and rare item drops.",
        icon: "rbxassetid://134567890123456",
        tooltip: "Higher luck means better chances for critical hits and rare loot"
    }
};

// Utility Functions
export function calculateTotal(values: AttributeValues): number {
    return values.baseValue + values.equipmentBonus + values.effectBonus;
}

export function createValues(overrides?: Partial<AttributeValues>): AttributeValues {
    return { baseValue: 0, equipmentBonus: 0, effectBonus: 0, ...overrides };
}

export function createState(overrides?: Partial<Record<AttributeKey, Partial<AttributeValues>>>): AttributesState {
    const state = {} as AttributesState;
    for (const key of ATTRIBUTE_KEYS) {
        const values = createValues(overrides?.[key]);
        state[key] = {
            meta: AttributeCatalog[key],
            values,
            totalValue: calculateTotal(values)
        };
    }
    return state;
}

export function isValidKey(key: string): key is AttributeKey {
    return ATTRIBUTE_KEYS.includes(key as AttributeKey);
}

export function clamp(value: number, min = 0, max = 9999): number {
    return math.max(min, math.min(max, value));
}

// Reactive State Management
export interface ReactiveAttributeState {
    meta: AttributeMeta;
    values: {
        baseValue: Value<number>;
        equipmentBonus: Value<number>;
        effectBonus: Value<number>;
    };
    totalValue: Computed<number>;
}

export type ReactiveAttributesState = {
    [key in AttributeKey]: ReactiveAttributeState;
};

export interface AttributeManagerConfig {
    initialValues?: Partial<Record<AttributeKey, number>>;
    autoPersist?: boolean;
    maxValue?: number;
    minValue?: number;
}

/**
 * Compact Attribute Manager - Combines base functionality with implementation
 */
export abstract class AttributeManager {
    protected readonly config: Required<AttributeManagerConfig>;
    protected readonly states: ReactiveAttributesState;
    private readonly observers: Observer[] = [];

    constructor(config: AttributeManagerConfig = {}) {
        this.config = {
            initialValues: {},
            autoPersist: false,
            maxValue: 9999,
            minValue: 0,
            ...config,
        };

        this.states = this.initializeStates();
        this.setupObservers();
    }

    private initializeStates(): ReactiveAttributesState {
        const states = {} as ReactiveAttributesState;
        for (const key of ATTRIBUTE_KEYS) {
            const initial = this.config.initialValues[key] ?? 0;
            const baseValue = Value(initial);
            const equipmentBonus = Value(0);
            const effectBonus = Value(0);
            
            states[key] = {
                meta: AttributeCatalog[key],
                values: { baseValue, equipmentBonus, effectBonus },
                totalValue: Computed(() => {
                    const total = baseValue.get() + equipmentBonus.get() + effectBonus.get();
                    return clamp(total, this.config.minValue, this.config.maxValue);
                })
            };
        }
        return states;
    }

    private setupObservers(): void {
        for (const [key, state] of pairs(this.states)) {
            const observer = Observer(state.totalValue);
            let prev = state.totalValue.get();
            observer.onChange(() => {
                const curr = state.totalValue.get();
                this.onAttributeChanged(key as AttributeKey, prev, curr);
                prev = curr;
                if (this.config.autoPersist) this.persistState();
            });
            this.observers.push(observer);
        }
    }

    // Public API
    public getState(key: AttributeKey) { return this.states[key]; }
    public getValue(key: AttributeKey) { return this.states[key].totalValue.get(); }
    public getAllStates() { return this.states; }
    
    public setBase(key: AttributeKey, value: number): boolean {
        if (!this.validate(key, value)) return false;
        this.states[key].values.baseValue.set(clamp(value, this.config.minValue, this.config.maxValue));
        return true;
    }

    public setEquipment(key: AttributeKey, value: number): boolean {
        if (!this.validate(key, value)) return false;
        this.states[key].values.equipmentBonus.set(value);
        return true;
    }

    public setEffect(key: AttributeKey, value: number): boolean {
        if (!this.validate(key, value)) return false;
        this.states[key].values.effectBonus.set(value);
        return true;
    }

    public modify(key: AttributeKey, delta: number): boolean {
        const current = this.states[key].values.baseValue.get();
        return this.setBase(key, current + delta);
    }

    public exportData(): Record<AttributeKey, AttributeValues> {
        const data = {} as Record<AttributeKey, AttributeValues>;
        for (const [key, state] of pairs(this.states)) {
            data[key as AttributeKey] = {
                baseValue: state.values.baseValue.get(),
                equipmentBonus: state.values.equipmentBonus.get(),
                effectBonus: state.values.effectBonus.get(),
            };
        }
        return data;
    }

    public loadData(data: Partial<Record<AttributeKey, AttributeValues>>): void {
        for (const [key, values] of pairs(data)) {
            const k = key as AttributeKey;
            if (values) {
                this.setBase(k, values.baseValue ?? 0);
                this.setEquipment(k, values.equipmentBonus ?? 0);
                this.setEffect(k, values.effectBonus ?? 0);
            }
        }
    }

    public destroy(): void {
        this.observers.forEach(obs => {}); // Cleanup if needed
        this.observers.clear();
    }

    // Abstract methods
    protected abstract validate(key: AttributeKey, value: number): boolean;
    protected abstract onAttributeChanged(key: AttributeKey, oldValue: number, newValue: number): void;
    protected abstract persistState(): void;
}

/**
 * Simple implementation example
 */
export class SimpleAttributeManager extends AttributeManager {
    protected validate(key: AttributeKey, value: number): boolean {
        return value >= this.config.minValue && value <= this.config.maxValue;
    }

    protected onAttributeChanged(key: AttributeKey, oldValue: number, newValue: number): void {
        print(`${key}: ${oldValue} → ${newValue}`);
    }

    protected persistState(): void {
        // Implement your persistence logic
        const data = this.exportData();
        // Save to DataStore, send to server, etc.
    }
}
