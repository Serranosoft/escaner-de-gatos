import { useCallback, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import LottieView from 'lottie-react-native';
import { ui } from '../../src/utils/styles';
import { getRecords } from "../../src/utils/recordsHandler";
import HeaderHome from "../../src/layout/header-home";

export default function Records() {

    const [records, setRecords] = useState(null);

    useFocusEffect(
        useCallback(() => {
            getRecords(setRecords);
        }, [])
    );

    return (
        <>
            <HeaderHome />
            <View style={styles.container}>
                {
                    records ?
                        records.length > 0 ?
                            <View style={styles.list}>
                                <Text style={[ui.h2, { textAlign: "center" }]}>Historial de razas analizadas</Text>
                                <FlatList
                                    contentContainerStyle={{ paddingBottom: 8, paddingTop: 8, gap: 16 }}
                                    data={records}
                                    numColumns={1}
                                    initialNumToRender={8}
                                    renderItem={({ item, i }) => {

                                        const dateFormatted =
                                            new Date(item.date).toLocaleDateString(
                                                'es-ES',
                                                {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }
                                            )

                                        return (
                                            <Link asChild href={{ pathname: "/record-detail", params: { date: dateFormatted, image: encodeURIComponent(item.image), result: item.result } }}>
                                                <Pressable>
                                                    <View style={styles.item}>
                                                        <Image source={{ uri: item.image }} style={styles.image} />
                                                        <Text style={[ui.h4, { maxWidth: 200 }]}>{dateFormatted}</Text>
                                                    </View>
                                                </Pressable>
                                            </Link>
                                        )
                                    }}
                                />
                            </View>
                            :
                            <Text style={[ui.h2, { textAlign: "center" }]}>No tienes razas analizadas</Text>
                        :
                        <LottieView source={require("../../assets/lottie/cat.json")} loop={true} autoPlay={true} />
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 32,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 24,
        marginTop: 32
    },

    list: {
        flex: 1,
        width: "100%",
        gap: 16
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderWidth: 4,
        borderColor: "#3DBAC2",
        paddingRight: 8,
        borderRadius: 8
    },
    image: {
        width: 100, 
        height: 100,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    }
})