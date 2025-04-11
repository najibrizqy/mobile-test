import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './HomeStyles';
import { getJokeCategories, getJokes } from '../../services/jokeService';

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [jokes, setJokes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [expanded, setExpanded] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoriesData = await getJokeCategories();
                setCategories(categoriesData);
                console.log('Categories:', categoriesData);

                // Fetch jokes
                const jokesData = await getJokes('Pun', 2);
                setJokes(jokesData);
                console.log('Jokes:', jokesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const toggleExpanded = (category: string) => {
        if (expanded === category) {
            setExpanded('');
        } else {
            setExpanded(category);
        }
    };

    const moveToTop = (category: string) => {
        const newCategories = [...categories];
        const index = newCategories.indexOf(category);
        if (index > 0) {
            newCategories.splice(index, 1);
            newCategories.unshift(category);
            setCategories(newCategories);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Application</Text>
            </View>
            <FlatList
                data={categories}
                renderItem={({ item, index }) => (
                    <View style={styles.cardContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.cardHeader} onPress={() => toggleExpanded(item)}>
                            <Text style={styles.cardTitle}>{item}</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={index === 0 ? styles.btnTop : styles.btnToTop}
                                onPress={() => moveToTop(item)}
                            >
                                <Text style={index === 0 ? undefined : styles.toTopText}>{index === 0 ? 'Top' : 'Go Top'}</Text>
                            </TouchableOpacity>
                            <Ionicons name={expanded === item ? "chevron-up" : "chevron-down"} size={18} color="#282828" />
                        </TouchableOpacity>
                        {expanded === item && (
                            <View style={styles.cardContent}>
                                <View style={styles.contentItem}>
                                    <Text>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, testing, and web development.</Text>
                                </View>
                                <View style={styles.contentItem}>
                                    <Text>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, testing, and web development.</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnAddMoreData}>
                                    <Text>Add more data</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        }
                    </View>
                )}
                ListHeaderComponent={<View style={{ marginTop: 20 }} />}
            />
            {/* <ScrollView>
                <View style={styles.scrollContent}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Text A</Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btnTop}>
                                <Text>Top</Text>
                            </TouchableOpacity>
                            <Ionicons name="chevron-down" size={18} color="#282828" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Text B</Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btnToTop}>
                                <Text style={styles.toTopText}>Go Top</Text>
                            </TouchableOpacity>
                            <Ionicons name="chevron-up" size={18} color="#282828" />
                        </TouchableOpacity>
                        <View style={styles.cardContent}>
                            <View style={styles.contentItem}>
                                <Text>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, testing, and web development.</Text>
                            </View>
                            <View style={styles.contentItem}>
                                <Text>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, testing, and web development.</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btnAddMoreData}>
                                <Text>Add more data</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView> */}
        </View>
    );
}

export default Home;