/* eslint-disable @typescript-eslint/no-shadow */
import React, { memo, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Joke, JokeError } from '../services/jokeService';
import styles from './styles';
import PopupItem from './PopupItem';

interface CardItemProps {
    item: string;
    index: number;
    expanded: string;
    jokes: Joke[];
    clickCount: number;
    categoryJokes: {
        [category: string]: {
            jokes: Joke[];
            clickCount: number;
            error?: JokeError;
            loading?: boolean;
        };
    };
    toggleExpanded: (category: string) => void;
    moveToTop: (category: string) => void;
    loadMoreJokes: () => void;
}

const CardItem: React.FC<CardItemProps> = memo(({
    item,
    index,
    expanded,
    jokes,
    clickCount,
    categoryJokes,
    toggleExpanded,
    moveToTop,
    loadMoreJokes,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedJoke, setSelectedJoke] = useState<string>('');

    const handleJokePress = (joke: string) => {
        setSelectedJoke(joke);
        setModalVisible(true);
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.cardHeader} onPress={() => toggleExpanded(item)}>
                <Text style={styles.cardTitle}>{index + 1}   {item}</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={index === 0 ? styles.btnTop : styles.btnToTop}
                    onPress={() => moveToTop(item)}
                >
                    <Text style={index === 0 ? undefined : styles.toTopText}>{index === 0 ? 'Top' : 'Go Top'}</Text>
                </TouchableOpacity>
                <Ionicons name={expanded === item ? 'chevron-up' : 'chevron-down'} size={18} color="#282828" />
            </TouchableOpacity>
            {expanded === item && (
                <View style={styles.cardContent}>
                    {categoryJokes[item]?.loading ? (
                        <View style={styles.contentItem}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : categoryJokes[item]?.error ? (
                        <View style={styles.contentItem}>
                            <Text style={styles.textError}>{categoryJokes[item].error.message}</Text>
                            {categoryJokes[item].error.causedBy && (
                                <Text style={styles.causedBy}>
                                    {categoryJokes[item].error.causedBy.join(', ')}
                                </Text>
                            )}
                        </View>
                    ) : (
                        <FlatList
                            data={jokes}
                            keyExtractor={(item, idx) => idx.toString()}
                            renderItem={({ item: joke, index: jokeIndex }) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={jokeIndex === jokes.length - 1 ? styles.contentItemNoBorder : styles.contentItem}
                                    onPress={() => handleJokePress(joke.joke)}
                                >
                                    <Text>{joke.joke}</Text>
                                </TouchableOpacity>
                            )}
                            scrollEnabled={false}
                            ListFooterComponent={
                                clickCount < 2 ? (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.btnAddMoreData}
                                        onPress={loadMoreJokes}
                                    >
                                        <Text>Add more data</Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                        />
                    )}
                </View>
            )}
            <PopupItem
                visible={modalVisible}
                content={selectedJoke}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
});

export default CardItem;
