import { AttributeIconMap } from "./attribute-constants";
import { AttributeMeta, AttributeKey } from "./attribute-types";

/* Catalog of Attributes */
export const AttributeCatalog: Record<AttributeKey, AttributeMeta> = {
	["vitality"]: {
		displayName: "Vitality",
		description: "Increases maximum health points.",
		icon: AttributeIconMap.vitality,
		tooltip: "Each point of Vitality increases your maximum HP, making you more resilient in combat.",
	},
	["strength"]: {
		displayName: "Strength",
		description: "Increases physical damage dealt.",
		icon: AttributeIconMap.strength,
		tooltip: "Higher Strength enhances your melee and physical weapon damage output.",
	},
	["agility"]: {
		displayName: "Agility",
		description: "Increases accuracy and evasion.",
		icon: AttributeIconMap.agility,
		tooltip: "Agility improves your hit chance, dodge rate, and movement speed in combat.",
	},
	["intellect"]: {
		displayName: "Intellect",
		description: "Increases magic damage dealt.",
		icon: AttributeIconMap.intellect,
		tooltip: "Intellect boosts your magical damage and may increase mana pool or spell effectiveness.",
	},
	["luck"]: {
		displayName: "Luck",
		description: "Increases chance for critical hits.",
		icon: AttributeIconMap.luck,
		tooltip: "Luck influences critical hit chance, rare item drops, and other random events.",
	},
} as const satisfies Record<AttributeKey, AttributeMeta>;

