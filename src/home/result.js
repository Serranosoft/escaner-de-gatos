import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ui } from "../utils/styles";
import { useEffect, useState } from "react";
import { saveRecord } from "../utils/recordsHandler";
import { Image } from "expo-image";

export function renderDot(color) {
    return <View style={{ height: 16, width: 16, borderRadius: 5, backgroundColor: color, marginRight: 8 }} />
};

export default function Result({ result, image, saveResult }) {

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (saveResult && (result && image) && !isSaved) {
            saveRecord(image, result);
            setIsSaved(true)
        }
    }, [result, image])

    const pieData = [];
    result.forEach((item) => {
        pieData.push({
            value: item.percentage,
            color: item.color
        })
    })


    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                <Image source={{ uri: decodeURIComponent(encodeURIComponent(image)) }} style={styles.image} />
                <PieChart
                    data={pieData}
                    donut
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={'#fff'}
                    centerLabelComponent={() => {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, color: '#2e2e2e', fontWeight: 'bold' }}>{result[0].percentage}%</Text>
                                <Text style={{ fontSize: 14, color: '#2e2e2e' }}>{result[0].race}</Text>
                            </View>
                        );
                    }}
                />
                {
                    result.map((item) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {renderDot(item.color)}
                                <Text style={ui.muted}>{item.race}: {item.percentage}%</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    wrapper: {
        padding: 32,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 8,
        alignItems: "center",
        borderColor: "#3DBAC2",
        gap: 16
    },
    image: {
        width: 170,
        height: 220,
        borderRadius: 8
    }
})