# @trembus/rpg-attributes

A streamlined RPG attribute system for Roblox-TS with Fusion integration. Provides type-safe attribute management, reactive state, and UI components for RPG games.

## Features

- 🎯 **Type-Safe**: Full TypeScript support with strict typing
- ⚡ **Reactive**: Built with Fusion for reactive state management  
- 🎮 **RPG-Ready**: Pre-configured with common RPG attributes
- 🛠️ **Extensible**: Easy to customize and extend
- 📱 **UI Components**: Fusion-based UI components included
- 💾 **Serializable**: DataStore-ready with built-in serialization
- 🚀 **Compact**: Streamlined codebase with 68% size reduction
- 🔄 **Reactive UI**: Seamless integration with Fusion reactive UI systems

## Installation

```bash
npm install @trembus/rpg-attributes
# or
pnpm add @trembus/rpg-attributes
```

## Quick Start

### Basic Usage

```typescript
import { SimpleAttributeManager, AttributeCatalog, ATTRIBUTE_KEYS, AttributeKey } from "@trembus/rpg-attributes";

// Create a simple attribute manager using the included implementation
const attributes = new SimpleAttributeManager({ 
    initialValues: { vitality: 10, strength: 8 },
    maxValue: 100,
    minValue: 0
});

// Set values
attributes.setBase("vitality", 15);
attributes.setEquipment("strength", 5);

// Get reactive states for UI
const vitalityState = attributes.getState("vitality");
const totalVitality = vitalityState.totalValue; // Fusion Computed - reactive!
```

### Custom Implementation

For custom behavior, extend the abstract `AttributeManager` class:

```typescript
import { AttributeManager, AttributeKey } from "@trembus/rpg-attributes";

class MyAttributes extends AttributeManager {
    protected validate(key: AttributeKey, value: number): boolean {
        return value >= 0 && value <= 100;
    }

    protected onAttributeChanged(key: AttributeKey, oldValue: number, newValue: number): void {
        print(`${key} changed from ${oldValue} to ${newValue}`);
    }

    protected persistState(): void {
        // Save to DataStore or send to server
        const data = this.exportData();
        // ... your persistence logic
    }
}
```

### UI Integration

```typescript
import { AttributeDisplay, AttributeBar } from "@trembus/rpg-attributes";

// Create attribute display UI - shows icon, name, value, and breakdown
const vitalityDisplay = AttributeDisplay({
    attribute: attributes.getState("vitality"),
    key: "vitality",
    Size: UDim2.fromScale(1, 0.2),
    BackgroundColor3: Color3.fromRGB(40, 40, 40),
    TextColor3: Color3.fromRGB(255, 255, 255),
});

// Create attribute bar - shows value as a progress bar
const healthBar = AttributeBar({
    attribute: attributes.getState("vitality"),
    maxValue: 100,
    fillColor: Color3.fromRGB(255, 100, 100),
});
```

## UI Components

### AttributeDisplay

Creates a complete attribute display with icon, name, total value, and breakdown:

```typescript
interface AttributeDisplayProps {
    attribute: ReactiveAttributeState;
    key: AttributeKey;
    Size?: UDim2;
    Position?: UDim2;
    BackgroundColor3?: Color3;
    TextColor3?: Color3;
}
```

### AttributeBar

Creates a progress bar representation of an attribute:

```typescript
interface AttributeBarProps {
    attribute: ReactiveAttributeState;
    maxValue?: number;      // Default: 100
    fillColor?: Color3;     // Default: green
}

## Core Types

### Attribute Keys

```typescript
type AttributeKey = "vitality" | "strength" | "agility" | "intellect" | "luck";
```

### Attribute Values

```typescript
interface AttributeValues {
    baseValue: number;        // Base stat value
    equipmentBonus: number;   // Bonus from equipped items
    effectBonus: number;      // Bonus from temporary effects
}
```

### Attribute State

```typescript
type AttributesState = {
    [key in AttributeKey]: {
        meta: AttributeMeta;
        values: AttributeValues;
        totalValue: number;
    }
};
```

## Available Attributes

| Attribute | Description | Effect |
|-----------|-------------|---------|
| **Vitality** | Increases maximum health points | Higher HP pool for survival |
| **Strength** | Increases physical damage dealt | Enhanced melee/weapon damage |
| **Agility** | Increases movement speed and dodge chance | Better movement speed and evasion |
| **Intellect** | Increases mana pool and spell damage | More mana and stronger spells |
| **Luck** | Increases chance for critical hits | Higher crit chance and rare drops |

## API Reference

### AttributeManager

The main class for managing reactive attributes:

```typescript
abstract class AttributeManager {
    // Get reactive state for an attribute
    getState(key: AttributeKey): ReactiveAttributeState;
    
    // Get current total value
    getValue(key: AttributeKey): number;
    
    // Get all reactive states
    getAllStates(): ReactiveAttributesState;
    
    // Set attribute values
    setBase(key: AttributeKey, value: number): boolean;
    setEquipment(key: AttributeKey, value: number): boolean;
    setEffect(key: AttributeKey, value: number): boolean;
    
    // Modify base value by delta
    modify(key: AttributeKey, delta: number): boolean;
    
    // Data persistence
    exportData(): Record<AttributeKey, AttributeValues>;
    loadData(data: Partial<Record<AttributeKey, AttributeValues>>): void;
    
    // Cleanup
    destroy(): void;
    
    // Abstract methods to implement
    protected abstract validate(key: AttributeKey, value: number): boolean;
    protected abstract onAttributeChanged(key: AttributeKey, oldValue: number, newValue: number): void;
    protected abstract persistState(): void;
}
```

### Utility Functions

```typescript
// Calculate total attribute value
calculateTotal(values: AttributeValues): number;

// Create attribute values with defaults
createValues(overrides?: Partial<AttributeValues>): AttributeValues;

// Create complete attribute state
createState(overrides?: Partial<Record<AttributeKey, Partial<AttributeValues>>>): AttributesState;

// Validate attribute key
isValidKey(key: string): key is AttributeKey;

// Clamp value to range
clamp(value: number, min?: number, max?: number): number;
```

## Package Status

✅ **Complete and Production Ready:**

- ✅ Compact, streamlined codebase (68% size reduction)
- ✅ Full TypeScript support with strict typing
- ✅ Reactive state management with Fusion integration
- ✅ Abstract base class for custom implementations
- ✅ UI components for attribute display and bars
- ✅ Data persistence and serialization support
- ✅ Comprehensive validation and event handling
- ✅ All core RPG attributes (vitality, strength, agility, intellect, luck)
- ✅ Production-ready API with error handling

## Examples

### Simple Implementation

```typescript
import { SimpleAttributeManager } from "@trembus/rpg-attributes";

// Use the included simple implementation
const attributes = new SimpleAttributeManager({
    initialValues: { vitality: 10, strength: 8, agility: 12 },
    maxValue: 100,
    minValue: 0
});

// Set values
attributes.setBase("vitality", 15);
attributes.setEquipment("strength", 5);

// Get current values
const currentVitality = attributes.getValue("vitality");
print(`Current vitality: ${currentVitality}`);
```

### Advanced Custom Implementation

```typescript
class PlayerAttributeManager extends AttributeManager {
    private playerId: string;

    constructor(playerId: string) {
        super({
            initialValues: { vitality: 10, strength: 8, agility: 12, intellect: 6, luck: 5 },
            autoPersist: true,
            maxValue: 100
        });
        this.playerId = playerId;
        this.loadPlayerData();
    }

    protected validate(key: AttributeKey, value: number): boolean {
        // Custom validation - check if player has enough points to spend
        if (value < 0) return false;
        if (value > this.config.maxValue) return false;
        
        // Example: Check player level requirements
        const playerLevel = this.getPlayerLevel();
        const maxAllowedValue = 10 + (playerLevel * 2);
        return value <= maxAllowedValue;
    }

    protected onAttributeChanged(key: AttributeKey, oldValue: number, newValue: number): void {
        print(`Player ${this.playerId}: ${key} changed ${oldValue} → ${newValue}`);
        
        // Update derived stats
        this.updatePlayerStats(key, newValue);
        
        // Trigger achievements
        this.checkAchievements(key, newValue);
    }

    protected persistState(): void {
        const data = this.exportData();
        // Save to DataStore
        game.GetService("DataStoreService")
            .GetDataStore("PlayerAttributes")
            .SetAsync(this.playerId, data);
    }

    private updatePlayerStats(key: AttributeKey, value: number): void {
        const player = game.Players.GetPlayerByUserId(tonumber(this.playerId)!);
        if (!player?.Character) return;

        const humanoid = player.Character.FindFirstChild("Humanoid") as Humanoid;
        if (!humanoid) return;

        switch (key) {
            case "vitality":
                humanoid.MaxHealth = 100 + (value * 10);
                break;
            case "agility":
                humanoid.WalkSpeed = 16 + (value * 0.5);
                break;
        }
    }

    private getPlayerLevel(): number {
        // Your level calculation logic
        return 1;
    }

    private checkAchievements(key: AttributeKey, value: number): void {
        // Your achievement logic
    }

    private loadPlayerData(): void {
        // Load from DataStore
    }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Dependencies

- `@rbxts/fusion` - Reactive state management and UI framework

---

Built with ❤️ for the Roblox development community.
