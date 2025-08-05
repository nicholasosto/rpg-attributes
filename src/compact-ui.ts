/**
 * Compact Attribute UI Components
 * Streamlined Fusion components for RPG attributes
 */

import { Computed, New, Children } from "@rbxts/fusion";
import { AttributeKey, ReactiveAttributeState } from "./compact-core";

export interface AttributeDisplayProps {
    attribute: ReactiveAttributeState;
    key: AttributeKey;
    Size?: UDim2;
    Position?: UDim2;
    BackgroundColor3?: Color3;
    TextColor3?: Color3;
}

/**
 * Creates a complete attribute display UI element
 */
export function AttributeDisplay(props: AttributeDisplayProps) {
    const { attribute, key } = props;
    
    return New("Frame")({
        Name: `${key}Display`,
        Size: props.Size || UDim2.fromScale(1, 0.2),
        Position: props.Position || UDim2.fromScale(0, 0),
        BackgroundColor3: props.BackgroundColor3 || Color3.fromRGB(40, 40, 40),
        BorderSizePixel: 0,
        
        [Children]: [
            // Attribute Icon
            New("ImageLabel")({
                Name: "Icon",
                Size: UDim2.fromScale(0.15, 0.8),
                Position: UDim2.fromScale(0.05, 0.1),
                Image: attribute.meta.icon,
                BackgroundTransparency: 1,
                ScaleType: Enum.ScaleType.Fit,
            }),
            
            // Attribute Name
            New("TextLabel")({
                Name: "Name",
                Size: UDim2.fromScale(0.3, 0.4),
                Position: UDim2.fromScale(0.25, 0.1),
                Text: attribute.meta.displayName,
                TextColor3: props.TextColor3 || Color3.fromRGB(255, 255, 255),
                TextScaled: true,
                BackgroundTransparency: 1,
                Font: Enum.Font.GothamBold,
            }),
            
            // Total Value Display
            New("TextLabel")({
                Name: "TotalValue",
                Size: UDim2.fromScale(0.2, 0.6),
                Position: UDim2.fromScale(0.7, 0.2),
                Text: Computed(() => tostring(attribute.totalValue.get())),
                TextColor3: Color3.fromRGB(100, 255, 100),
                TextScaled: true,
                BackgroundTransparency: 1,
                Font: Enum.Font.GothamBold,
            }),
            
            // Breakdown (Base + Equipment + Effect)
            New("TextLabel")({
                Name: "Breakdown",
                Size: UDim2.fromScale(0.4, 0.3),
                Position: UDim2.fromScale(0.25, 0.55),
                Text: Computed(() => {
                    const base = attribute.values.baseValue.get();
                    const equip = attribute.values.equipmentBonus.get();
                    const effect = attribute.values.effectBonus.get();
                    return `${base} + ${equip} + ${effect}`;
                }),
                TextColor3: Color3.fromRGB(200, 200, 200),
                TextScaled: true,
                BackgroundTransparency: 1,
                Font: Enum.Font.Gotham,
            }),
        ],
    });
}

/**
 * Creates a simple attribute bar for compact display
 */
export function AttributeBar(props: { 
    attribute: ReactiveAttributeState; 
    maxValue?: number;
    fillColor?: Color3;
}) {
    const maxVal = props.maxValue || 100;
    
    return New("Frame")({
        Name: "AttributeBar",
        Size: UDim2.fromScale(1, 1),
        BackgroundColor3: Color3.fromRGB(60, 60, 60),
        BorderSizePixel: 0,
        
        [Children]: [
            New("Frame")({
                Name: "Fill",
                Size: Computed(() => {
                    const value = props.attribute.totalValue.get();
                    const percentage = math.min(value / maxVal, 1);
                    return UDim2.fromScale(percentage, 1);
                }),
                BackgroundColor3: props.fillColor || Color3.fromRGB(100, 200, 100),
                BorderSizePixel: 0,
            }),
            
            New("TextLabel")({
                Name: "ValueText",
                Size: UDim2.fromScale(1, 1),
                Text: Computed(() => tostring(props.attribute.totalValue.get())),
                TextColor3: Color3.fromRGB(255, 255, 255),
                TextScaled: true,
                BackgroundTransparency: 1,
                Font: Enum.Font.GothamBold,
            }),
        ],
    });
}
