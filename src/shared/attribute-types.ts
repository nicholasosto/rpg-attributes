/**
 * Attribute Types and Constants
 * This module defines the types and constants used for RPG attributes.
 * It includes attribute keys, metadata, and default values.
 * @module attribute-types
 * @license MIT
 * @author Trembus
 * @version 1.0.0
 * @description This module provides a structured way to manage RPG attributes, including their keys, metadata, and default values.
 */
/**
 * Attribute Keys
 * Defines the valid keys for RPG attributes.
 */
export const ATTRIBUTE_KEYS = ['vitality', 'strength', 'agility', 'intellect', 'luck'] as const;
export type AttributeKey = (typeof ATTRIBUTE_KEYS)[number];

/**
 * Attribute Metadata
 * Represents metadata for each attribute, including display name, description, and icon.
 * @typedef {Object} AttributeMeta
 * @property {string} displayName - The name displayed for the attribute.
 * @property {string} description - A brief description of the attribute.
 * @property {string} icon - The icon representing the attribute.
 * @property {string} [tooltip] - Optional tooltip text for additional information.
 */
export interface AttributeMeta {
	displayName: string; // Display name of the attribute
	description: string; // Description of the attribute
	icon: string; // Icon representing the attribute
    tooltip?: string; // Tooltip text for the attribute
}

/**
 * Attribute Values
 * Represents the values associated with an attribute, including base value and bonuses.
 * @typedef {Object} AttributeValues
 * @property {number} baseValue - Base value of the attribute.
 * @property {number} equipmentBonus - Bonus from equipped items.
 * @property {number} effectBonus - Bonus from active effects.
 */
export interface AttributeValues {
    baseValue: number; // Base value of the attribute
    equipmentBonus: number; // Bonus from equipped items
    effectBonus: number; // Bonus from active effects
}


/**
 * Attribute Data Transfer Object
 * Represents the data structure for transferring attribute data.
 * Used in Server-Client communication.
 * @typedef {Object} AttributeDTO
 */
export type AttributeDTO = {
    [key in AttributeKey]: AttributeValues
};

/**
 * Attributes State
 * Represents the state of all attributes in the game.
 * Each attribute has its metadata, current values, and total value.
 * @typedef {Object} AttributesState
 * @property {AttributeMeta} meta - Metadata for the attribute.
 * @property {AttributeValues} values - Current values of the attribute.
 * @property {number} totalValue - Total value considering all bonuses.
 */
export type AttributesState = {
    [key in AttributeKey]: {
        meta: AttributeMeta; // Metadata for the attribute
        values: AttributeValues; // Current values of the attribute
        totalValue: number; // Total value considering all bonuses
    }
};

/**
 * Attribute Change Event Data
 * Represents data for attribute change events
 * @typedef {Object} AttributeChangeEvent
 * @property {AttributeKey} attribute - The attribute that changed
 * @property {AttributeValues} oldValues - Previous attribute values
 * @property {AttributeValues} newValues - New attribute values
 * @property {number} oldTotal - Previous total value
 * @property {number} newTotal - New total value
 */
export interface AttributeChangeEvent {
    attribute: AttributeKey;
    oldValues: AttributeValues;
    newValues: AttributeValues;
    oldTotal: number;
    newTotal: number;
}

/**
 * Attribute Bonus Source
 * Defines the source of an attribute bonus
 */
export type BonusSource = "equipment" | "effect" | "base";

/**
 * Attribute Bonus Entry
 * Represents a single bonus applied to an attribute
 * @typedef {Object} AttributeBonus
 * @property {string} id - Unique identifier for the bonus
 * @property {BonusSource} source - Source of the bonus
 * @property {number} value - Bonus value (can be negative)
 * @property {string} [description] - Optional description of the bonus
 * @property {number} [duration] - Optional duration in seconds (for temporary effects)
 */
export interface AttributeBonus {
    id: string;
    source: BonusSource;
    value: number;
    description?: string;
    duration?: number;
}

/**
 * Attribute Configuration
 * Configuration options for attribute behavior
 * @typedef {Object} AttributeConfig
 * @property {number} minValue - Minimum allowed value
 * @property {number} maxValue - Maximum allowed value
 * @property {boolean} allowNegative - Whether negative values are allowed
 * @property {number} defaultBase - Default base value for new attributes
 */
export interface AttributeConfig {
    minValue: number;
    maxValue: number;
    allowNegative: boolean;
    defaultBase: number;
}

