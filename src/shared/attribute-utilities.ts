/**
 * Attribute Utilities
 * Helper functions and utilities for working with RPG attributes
 * @module attribute-utilities
 * @license MIT
 * @author Trembus
 * @version 1.0.0
 */

import { AttributeValues, AttributeKey, AttributesState, AttributeMeta } from "./attribute-types";
import { DefaultAttributeValues, AttributeIconMap } from "./attribute-constants";
import { AttributeCatalog } from "./attribute-catalog";

/**
 * Calculates the total value of an attribute including all bonuses
 * @param values - The attribute values to calculate
 * @returns The total attribute value
 */
export function calculateTotalAttributeValue(values: AttributeValues): number {
    return values.baseValue + values.equipmentBonus + values.effectBonus;
}

/**
 * Creates default attribute values with optional overrides
 * @param overrides - Optional overrides for default values
 * @returns Complete AttributeValues object
 */
export function createAttributeValues(overrides?: Partial<AttributeValues>): AttributeValues {
    return {
        ...DefaultAttributeValues,
        ...overrides,
    };
}

/**
 * Validates if a value is a valid AttributeKey
 * @param key - The value to validate
 * @returns True if the key is a valid AttributeKey
 */
export function isValidAttributeKey(key: string): key is AttributeKey {
    return key === "vitality" || key === "strength" || key === "agility" || key === "intellect" || key === "luck";
}

/**
 * Creates a complete attribute state entry
 * @param key - The attribute key
 * @param values - Optional attribute values (uses defaults if not provided)
 * @returns Complete attribute state entry
 */
export function createAttributeEntry(
    key: AttributeKey,
    values?: Partial<AttributeValues>
): AttributesState[AttributeKey] {
    const attributeValues = createAttributeValues(values);
    return {
        meta: AttributeCatalog[key],
        values: attributeValues,
        totalValue: calculateTotalAttributeValue(attributeValues),
    };
}

/**
 * Creates a complete attributes state with all attributes initialized
 * @param overrides - Optional overrides for specific attributes
 * @returns Complete AttributesState object
 */
export function createAttributesState(
    overrides?: Partial<Record<AttributeKey, Partial<AttributeValues>>>
): AttributesState {
    const state = {} as AttributesState;
    
    const attributeKeys: AttributeKey[] = ["vitality", "strength", "agility", "intellect", "luck"];
    
    for (const key of attributeKeys) {
        state[key] = createAttributeEntry(key, overrides?.[key]);
    }
    
    return state;
}

/**
 * Updates attribute values and recalculates total
 * @param currentState - Current attribute state
 * @param key - Attribute key to update
 * @param newValues - New values to apply
 * @returns Updated attribute state entry
 */
export function updateAttributeEntry(
    currentState: AttributesState,
    key: AttributeKey,
    newValues: Partial<AttributeValues>
): AttributesState[AttributeKey] {
    const updatedValues = {
        ...currentState[key].values,
        ...newValues,
    };
    
    return {
        ...currentState[key],
        values: updatedValues,
        totalValue: calculateTotalAttributeValue(updatedValues),
    };
}

/**
 * Gets the icon for a specific attribute
 * @param key - The attribute key
 * @returns The icon asset ID for the attribute
 */
export function getAttributeIcon(key: AttributeKey): string {
    return AttributeIconMap[key];
}

/**
 * Gets the metadata for a specific attribute
 * @param key - The attribute key
 * @returns The metadata for the attribute
 */
export function getAttributeMeta(key: AttributeKey): AttributeMeta {
    return AttributeCatalog[key];
}

/**
 * Clamps an attribute value between min and max bounds
 * @param value - The value to clamp
 * @param min - Minimum allowed value (default: 0)
 * @param max - Maximum allowed value (default: 999)
 * @returns The clamped value
 */
export function clampAttributeValue(value: number, min = 0, max = 999): number {
    return math.max(min, math.min(max, value));
}
