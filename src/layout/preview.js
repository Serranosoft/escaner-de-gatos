import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ui } from "../utils/styles"
import Ionicons from '@expo/vector-icons/Ionicons';
import { openai } from "../utils/api";
import NextResetInfo from "../components/nextResetInfo";
import { useContext, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import Button from "../components/button";
import { getPrompt } from "../utils/data";
import { MAX_CREDITS } from "../../app/(tabs)/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../Context";

export default function PreviewModal({ openModal, setOpenModal, canAnalyze, base64, result, setResult }) {

    const [analyzing, setAnalyzing] = useState(false);
    const { getNextReset } = useContext(Context);

    useEffect(() => {
        if (result) {
            setAnalyzing(false);
            updateNextReset();
            updateCount();
            setOpenModal(false);
        }
        
    }, [result])

    // Comenzar análisis
    async function startAnalysis() {
        setResult(null);
        setAnalyzing(true);
        openai(getPrompt(base64), setResult);
    }

    // Actualiza el siguiente reset
    async function updateNextReset() {
        const nextReset = new Date().getTime();
        await AsyncStorage.setItem("nextReset", `${nextReset}`);
    }

    // Actualiza el conteo de intentos que puede realizar
    async function updateCount() {
        let count = await AsyncStorage.getItem("results");
        if (count === null) count = MAX_CREDITS;

        count = parseInt(count);
        count--
        await AsyncStorage.setItem("results", `${count}`);
        getNextReset();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={openModal}
            onRequestClose={() => { setOpenModal(false) }}>
            <View style={styles.center}>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => setOpenModal(false)}>
                        <Text style={[ui.h4, { alignSelf: "flex-end" }]}>&#10006;</Text>
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Ionicons name="information-circle" size={32} color="#337AB7" />
                        <Text style={[ui.h4, { lineHeight: 24 }]}>{ analyzing ? "Evaluando raza..." : "¿Es correcto?" }</Text>
                    </View>
                    <View style={styles.container}>

                        {
                            analyzing ?
                                <LottieView style={{ width: 300, height: 300 }} source={require("../../assets/lottie/cat.json")} loop={true} autoPlay={true} />
                                :
                                <Image source={{ uri: `data:image/jpeg;base64, ${base64}` }} style={styles.image} /* resizeMode="contain" */ />
                        }
                    </View>

                    { !analyzing && 
                        <Button
                            text={canAnalyze ? "Evaluar raza" : `Ha agotado los créditos diarios`}
                            onClick={startAnalysis}
                            disabled={!canAnalyze}
                        />
                    }
                    <NextResetInfo />
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)"

    },
    wrapper: {
        width: "90%",
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,
        gap: 8,
        backgroundColor: '#fafafa',
        borderRadius: 20,
        shadowColor: '#2e2e2e',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flex: 0.7
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },


    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
    },
    image: {
        flex: 1,
        width: "100%",
        borderRadius: 8
    }
})