import { FontAwesome } from "@react-native-vector-icons/fontawesome";

const Icon = ({
    name,
    size,
    color
}: {
    name: any,
    size: number,
    color: any
}) => {
    return (
        <FontAwesome name={name} size={size} color={color} />
    )
}

export default Icon 