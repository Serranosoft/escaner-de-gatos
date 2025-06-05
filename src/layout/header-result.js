import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ui } from "../utils/styles";

export default function HeaderResult({ back }) {

    const router = useRouter();

    function handleBack() {
        if (back) {
            back();
        } else {
            router.back();
        }
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => handleBack()}>
                <Image source={require("../../assets/back.png")} style={styles.image} />
            </TouchableOpacity>
            <Text style={[ui.h3, { fontWeight: 700, alignSelf: "center" }]}>ESCÁNER DE GATOS</Text>
            <Text style={styles.image}></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "#3DBAC2",
    },

    image: {
        width: 30,
        height: 30,
        borderRadius: 100
    }
})