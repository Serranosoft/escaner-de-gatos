import { StyleSheet, Text, View } from "react-native";
import { ui } from "../src/utils/styles";
import { useLocalSearchParams } from "expo-router";
import Result from "../src/home/result";
import HeaderResult from "../src/layout/header-result";

export default function RecordDetail() {

    const params = useLocalSearchParams();
    const { date, image, result } = params;

    const pieData = [];
    JSON.parse(result).forEach((item) => {
        pieData.push({
            value: item.percentage,
            color: item.color
        })
    })

    return (
        <>
            <HeaderResult />
            <View style={styles.container}>
                <Text style={[ui.h3, { alignSelf: "center", textAlign: "center" }]}>{date}</Text>
                <Result {...{ result: JSON.parse(result), image }} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 24,

    },
    wrapper: {
        padding: 32,
        borderRadius: 20,
        backgroundColor: '#3DBAC2',
        alignItems: "center",
        gap: 16
    },
    image: {
        width: 250,
        height: 300,
        borderRadius: 8
    }
})