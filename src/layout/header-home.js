import { StyleSheet, Text, View } from "react-native";
import { ui } from "../utils/styles";

export default function HeaderHome() {
    return (
        <View style={styles.header}>
            <Text style={[ui.h3, { fontWeight: 700 }]}>ESCÁNER DE GATOS</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#3DBAC2",
    },
})