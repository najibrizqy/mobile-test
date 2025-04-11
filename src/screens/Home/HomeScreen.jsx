import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './HomeStyles';

export default Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Application</Text>
            </View>
            <ScrollView>
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
                    <View style={styles.cardContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Text C</Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btnToTop}>
                                <Text style={styles.toTopText}>Go Top</Text>
                            </TouchableOpacity>
                            <Ionicons name="chevron-down" size={18} color="#282828" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}