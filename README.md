# @rbxts/rpg-attributes

A comprehensive RPG attribute system for Roblox-TS with Fusion integration. Provides type-safe attribute management, reactive state, and UI components for RPG games.

## Features

- 🎯 **Type-Safe**: Full TypeScript support with strict typing
- ⚡ **Reactive**: Built with Fusion for reactive state management
- 🎮 **RPG-Ready**: Pre-configured with common RPG attributes
- 🛠️ **Extensible**: Easy to customize and extend
- 📱 **UI Components**: Fusion-based UI components included
- 💾 **Serializable**: DataStore-ready with built-in serialization

## Installation

```bash
npm install @rbxts/rpg-attributes
# or
pnpm add @rbxts/rpg-attributes
```

## Quick Start

```typescript
import { AttributeCatalog, ATTRIBUTE_KEYS, AttributeValues } from "@rbxts/rpg-attributes";

// Access pre-defined attributes
const vitalityMeta = AttributeCatalog.vitality;
print(vitalityMeta.displayName); // "Vitality"
print(vitalityMeta.description); // "Increases maximum health points."

// Work with attribute values
const playerStats: AttributeValues = {
    baseValue: 10,
    equipmentBonus: 5,
    effectBonus: 2
};

// Calculate total attribute value
const totalVitality = playerStats.baseValue + playerStats.equipmentBonus + playerStats.effectBonus;
```

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
| **Agility** | Increases accuracy and evasion | Better hit chance and dodge rate |
| **Intellect** | Increases magic damage dealt | Boosted magical damage output |
| **Luck** | Increases chance for critical hits | Higher crit chance and rare drops |

## Data Transfer

The package includes `AttributeDTO` for server-client communication:

```typescript
type AttributeDTO = {
    [key in AttributeKey]: AttributeValues
};
```

## Development Status

✅ **Foundation Complete:**

- Type definitions and constants
- Attribute catalog with full metadata and tooltips
- Comprehensive utility functions
- Basic data structures and DTOs
- Documentation and examples
- Package configuration and build system

🔄 **Next Phase - Core Features:**

- Attribute management system
- Fusion reactive integration
- UI components
- Serialization utilities

📋 **Future Enhancements:**

- Advanced bonus system
- Equipment integration
- Performance optimizations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Dependencies

- `@rbxts/fusion` - Reactive state management and UI framework

---

Built with ❤️ for the Roblox development community.
