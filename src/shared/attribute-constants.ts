/**
 * Attribute Constants
 * This module defines constants related to RPG attributes, including icons and default values.
 * @module attribute-constants
 * @license MIT
 * @author Trembus
 * @version 1.0.0
 * @description This module provides a structured way to manage RPG attribute icons and default values.
 */
import { AttributeValues, AttributeKey } from "./attribute-types";

/**
 * Attribute Icon Map
 * Maps attribute keys to their corresponding icon asset IDs.
 */
export const AttributeIconMap: Record<AttributeKey, string> = {
    vitality: "rbxassetid://121291227474039",
    strength: "rbxassetid://127745571044516",
    agility: "rbxassetid://73893872719367",
    intellect: "rbxassetid://107600003376684",
    luck: "rbxassetid://114767496083209",
};

/**
 * Default Attribute Values
 * Provides default values for attributes used in the game.
 */
export const DefaultAttributeValues: AttributeValues = {
    baseValue: 10,
    equipmentBonus: 2,
    effectBonus: 2,
};

