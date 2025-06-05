import { ui } from '../../src/utils/styles';
import { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Context } from '../../src/Context';
import PreviewModal from '../../src/layout/preview';
import Camera from '../../src/home/camera';
import Result from '../../src/home/result';
import HeaderResult from '../../src/layout/header-result';
import HeaderHome from '../../src/layout/header-home';
import useBackHandler from '../../src/components/use-back-handler';
import * as FileSystem from 'expo-file-system';

export default function Index() {

    const { getNextReset, base64, setBase64, canAnalyze } = useContext(Context);
    const [openModal, setOpenModal] = useState(false);
    const [result, setResult] = useState(null);
    const [image, setImage] = useState(null);

    useFocusEffect(
        useCallback(() => {
            getNextReset();
        }, [])
    );

    // Cuando se actualiza la imagen y su formato base64 navega hacia la preview
    useEffect(() => {
        if (base64) setOpenModal(true);
    }, [base64])

    useEffect(() => {
        result && saveCachedImage();
    }, [result])

    // Reset de la imagen seleccionada si se cierra el modal
    useEffect(() => {
        if (!openModal) {
            setBase64(null);
            setImage(null);
        }
    }, [openModal])

    async function saveCachedImage() {
        const filename = `${FileSystem.cacheDirectory}image_${Date.now()}.jpg`;
        await FileSystem.writeAsStringAsync(filename, base64, {
            encoding: FileSystem.EncodingType.Base64,
        });
        setImage(filename);
    }

    function reset() {
        setResult(null);
        setImage(null);
        setBase64(null);
    }

    useBackHandler(() => {
        if (result) {
            reset();
            return true;
        } else {
            return false;
        }
    });


    return (
        <>
            {result ? <HeaderResult {...{ back: reset }}/> : <HeaderHome />}
            <View style={styles.container}>
                {
                    result ?
                        <Result {...{ result, image, saveResult: true }} />
                        :
                        <View style={styles.home}>
                            <View>
                                <Text style={[ui.h2, { textAlign: "center" }]}>Haz una foto y descubre la raza de tu gato</Text>
                            </View>
                            <Camera {...{ setImage, setBase64 }} />
                        </View>
                }
            </View>
            <PreviewModal {...{ openModal, setOpenModal, base64, canAnalyze, setResult, result }} />
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
    },
    home: {
        flex: 1,
        gap: 24
    },

})