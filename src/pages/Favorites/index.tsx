import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

import { Teacher } from '../../components/TeacherItem';

function Favorites() {
    const [ favorites, setFavorites ] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const fav = JSON.parse(response);
                setFavorites(fav);
            }
        });
    }

    useFocusEffect(loadFavorites);

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) => (
                    <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorite
                    />
                ))}
            </ScrollView>
        </View>
    );
}

export default Favorites;