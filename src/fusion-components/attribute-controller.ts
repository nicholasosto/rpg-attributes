

/**
 * UI Component - Attribute Control
 * @description
 * This component provides a user interface for displaying and modifying RPG attributes.
 * It includes an icon, label, value display, and buttons for increasing or decreasing the attribute value.
 **/

import Fusion ,{New, Computed, Children, OnEvent} from "@rbxts/fusion";
import { AttributesState } from "../shared/attribute-types";

export interface AttributeControlProps extends Fusion.PropertyTable<Frame> {
    icon: Computed<string>;
    iconSize?: UDim2;
    label: Computed<string>;
    value: Computed<number>;
    onIncrease: () => void;
    onDecrease: () => void;
}

export function AttributeControl(props: AttributeControlProps) {
    const { icon, label, value, onIncrease, onDecrease } = props;

    const layout = New("UIListLayout")({
        FillDirection: Enum.FillDirection.Horizontal,
        SortOrder: Enum.SortOrder.LayoutOrder,
        HorizontalAlignment: Enum.HorizontalAlignment.Left,
        VerticalAlignment: Enum.VerticalAlignment.Center,
        Padding: new UDim(0, 5),
    });

    const attributeIcon = New("ImageLabel")({
        Size: props.iconSize ?? new UDim2(0, 32, 0, 32),
        Image: icon,
        BackgroundTransparency: 1,
        LayoutOrder: 1,
    });

    const attributeLabel = New("TextLabel")({
        Text: label,
        BackgroundTransparency: 1,
        LayoutOrder: 2,
    });

    const attributeValue = New("TextLabel")({
        Text: tostring(value),
        BackgroundTransparency: 1,
        LayoutOrder: 3,
    });

    const increaseButton = New("TextButton")({
        Text: "+",
        BackgroundTransparency: 1,
        LayoutOrder: 4,
        [OnEvent("Activated")]: () => onIncrease(),
    });

    const decreaseButton = New("TextButton")({
        Text: "-",
        BackgroundTransparency: 1,
        LayoutOrder: 5,
        [OnEvent("Activated")]: () => onDecrease(),
    });

    const uiComponent = New("Frame")({
        Size: props.Size ?? new UDim2(1, 0, 0, 50),
        Position: props.Position ?? new UDim2(0, 0, 0, 0),
        AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
        BackgroundColor3: props.BackgroundColor3 ?? Color3.fromRGB(255, 255, 255),
        BackgroundTransparency: props.BackgroundTransparency ?? 0.5,
        LayoutOrder: props.LayoutOrder ?? 0,
        ZIndex: props.ZIndex ?? 1,

        [Children]: [
            layout,
            attributeIcon,
            attributeLabel,
            attributeValue,
            increaseButton,
            decreaseButton,
        ],
    });

    return uiComponent;
}