import { Text } from "react-native";
import { ui } from "../utils/styles";
import { Context } from "../Context";
import { useContext } from "react";

export default function NextResetInfo() {

    const { nextReset, canAnalyze } = useContext(Context);

    return (
        <>
            {!canAnalyze && <Text style={[ui.muted, { color: "#2e2e2e" }]}>{`Próximos análisis gratuito: ${new Date(nextReset).toLocaleDateString()} (${new Date(nextReset).toLocaleTimeString()})`}</Text>}
        </>

    )
}