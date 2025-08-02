/**
 * RPG Attributes Usage Examples
 * Demonstrates how to use the @rbxts/rpg-attributes package
 */

import {
    AttributeCatalog,
    AttributeKey,
    AttributeValues,
    AttributesState,
    createAttributesState,
    createAttributeValues,
    calculateTotalAttributeValue,
    updateAttributeEntry,
    getAttributeMeta,
    isValidAttributeKey,
    clampAttributeValue,
} from "../src";

// Example 1: Working with individual attribute metadata
function demonstrateAttributeMeta() {
    const vitalityMeta = AttributeCatalog.vitality;
    print(`Attribute: ${vitalityMeta.displayName}`);
    print(`Description: ${vitalityMeta.description}`);
    print(`Tooltip: ${vitalityMeta.tooltip}`);
    print(`Icon: ${vitalityMeta.icon}`);
}

// Example 2: Creating and managing attribute values
function demonstrateAttributeValues() {
    // Create default values
    const defaultValues = createAttributeValues();
    print(`Default base value: ${defaultValues.baseValue}`);
    
    // Create custom values
    const customValues = createAttributeValues({
        baseValue: 15,
        equipmentBonus: 3,
    });
    
    // Calculate total
    const total = calculateTotalAttributeValue(customValues);
    print(`Total attribute value: ${total}`);
}

// Example 3: Creating a complete attribute state
function demonstrateAttributeState() {
    // Create default state for all attributes
    const playerAttributes = createAttributesState();
    
    // Create custom state with overrides
    const customPlayerAttributes = createAttributesState({
        vitality: { baseValue: 20 },
        strength: { baseValue: 15, equipmentBonus: 5 },
        luck: { baseValue: 8, effectBonus: 3 },
    });
    
    print(`Player vitality total: ${customPlayerAttributes.vitality.totalValue}`);
    print(`Player strength total: ${customPlayerAttributes.strength.totalValue}`);
}

// Example 4: Updating attributes dynamically
function demonstrateAttributeUpdates() {
    let playerState = createAttributesState();
    
    // Update vitality when player levels up
    playerState.vitality = updateAttributeEntry(playerState, "vitality", {
        baseValue: playerState.vitality.values.baseValue + 2,
    });
    
    // Update strength when equipping new gear
    playerState.strength = updateAttributeEntry(playerState, "strength", {
        equipmentBonus: 8,
    });
    
    print(`Updated vitality: ${playerState.vitality.totalValue}`);
    print(`Updated strength: ${playerState.strength.totalValue}`);
}

// Example 5: Validation and utility functions
function demonstrateUtilities() {
    // Validate attribute keys
    const userInput = "vitality";
    if (isValidAttributeKey(userInput)) {
        const meta = getAttributeMeta(userInput);
        print(`Valid attribute: ${meta.displayName}`);
    }
    
    // Clamp values to valid ranges
    const clampedValue = clampAttributeValue(1050, 0, 999); // Will be 999
    const clampedNegative = clampAttributeValue(-5, 0, 999); // Will be 0
    
    print(`Clamped value: ${clampedValue}`);
    print(`Clamped negative: ${clampedNegative}`);
}

// Example 6: Working with all attribute keys
function demonstrateAllAttributes() {
    const allKeys: AttributeKey[] = ["vitality", "strength", "agility", "intellect", "luck"];
    
    for (const key of allKeys) {
        const meta = getAttributeMeta(key);
        print(`${meta.displayName}: ${meta.description}`);
    }
}

// Run examples
export function runExamples() {
    print("=== RPG Attributes Examples ===");
    
    print("\n--- Attribute Metadata ---");
    demonstrateAttributeMeta();
    
    print("\n--- Attribute Values ---");
    demonstrateAttributeValues();
    
    print("\n--- Attribute State ---");
    demonstrateAttributeState();
    
    print("\n--- Attribute Updates ---");
    demonstrateAttributeUpdates();
    
    print("\n--- Utilities ---");
    demonstrateUtilities();
    
    print("\n--- All Attributes ---");
    demonstrateAllAttributes();
}
