import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    RefreshControl,
} from 'react-native';

import styles from './HomeStyles';
import CardItem from '../../components/CardItem';
import { getJokeCategories, getJokes } from '../../services/jokeService';
import { Joke, JokeError } from '../../services/jokeService';
import type { ListRenderItemInfo } from 'react-native';

interface HomeProps { }

interface CategoryJokes {
    [category: string]: {
        jokes: Joke[];
        clickCount: number;
        error?: JokeError;
        loading?: boolean;
    };
}

const Home: React.FC<HomeProps> = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [categoryJokes, setCategoryJokes] = useState<CategoryJokes>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<string>('');
    const flatListRef = useRef<FlatList>(null);

    // Memoize the current jokes and click count based on expanded category
    const { jokes, clickCount } = useMemo(() => {
        if (!expanded || !categoryJokes[expanded]) {
            return { jokes: [], clickCount: 0 };
        }
        return {
            jokes: categoryJokes[expanded].jokes || [],
            clickCount: categoryJokes[expanded].clickCount || 0,
        };
    }, [expanded, categoryJokes]);

    const fetchData = useCallback(async () => {
        try {
            const categoriesData = await getJokeCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleExpanded = useCallback(async (category: string) => {
        if (expanded === category) {
            setExpanded('');
            return;
        }
        setExpanded(category);
        // Use existing jokes if available
        if (categoryJokes[category]) {
            return;
        }
        // Set loading state for this category
        setCategoryJokes(prevState => ({
            ...prevState,
            [category]: {
                jokes: [],
                clickCount: 0,
                loading: true,
            },
        }));

        try {
            const jokesData = await getJokes(category, 2);
            if (jokesData && 'error' in jokesData && jokesData.error) {
                setCategoryJokes(prevState => ({
                    ...prevState,
                    [category]: {
                        jokes: [],
                        clickCount: 0,
                        error: jokesData as JokeError,
                        loading: false,
                    },
                }));
            } else {
                setCategoryJokes(prevState => ({
                    ...prevState,
                    [category]: {
                        jokes: jokesData as Joke[],
                        clickCount: 0,
                        loading: false,
                    },
                }));
            }
        } catch (error) {
            console.error('Error fetching jokes:', error);
            setCategoryJokes(prevState => ({
                ...prevState,
                [category]: {
                    jokes: [],
                    clickCount: 0,
                    error: {
                        error: true,
                        message: 'Failed to fetch jokes',
                    },
                    loading: false,
                },
            }));
        }
    }, [expanded, categoryJokes]);

    const loadMoreJokes = useCallback(async () => {
        if (!expanded) {return;}

        try {
            const moreJokesData = await getJokes(expanded, 2);
            if (moreJokesData && 'error' in moreJokesData && moreJokesData.error) {
                console.error('Error fetching more jokes:', moreJokesData.message);
                setCategoryJokes(prevState => ({
                    ...prevState,
                    [expanded]: {
                        ...prevState[expanded],
                        error: moreJokesData as JokeError,
                    },
                }));
            } else {
                setCategoryJokes(prevState => {
                    const currentJokes = prevState[expanded]?.jokes || [];
                    const currentClickCount = prevState[expanded]?.clickCount || 0;
                    const newClickCount = currentClickCount + 1;
                    return {
                        ...prevState,
                        [expanded]: {
                            ...prevState[expanded],
                            jokes: [...currentJokes, ...(moreJokesData as Joke[])],
                            clickCount: newClickCount,
                        },
                    };
                });
            }
        } catch (error) {
            console.error('Error fetching more jokes:', error);
        }
    }, [expanded]);

    const moveToTop = useCallback((category: string) => {
        const index = categories.indexOf(category);
        if (index <= 0) {return;}
        setCategories(prevCategories => {
            const newCategories = [...prevCategories];
            newCategories.splice(index, 1);
            newCategories.unshift(category);
            return newCategories;
        });
        setTimeout(() => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }, 100);
    }, [categories]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setExpanded('');
        setCategoryJokes({});
        await fetchData();
    }, [fetchData]);

    // Memoize the renderItem function to prevent unnecessary re-renders
    const renderItem = useCallback(({ item, index }: ListRenderItemInfo<string>) => (
        <CardItem
            item={item}
            index={index}
            expanded={expanded}
            jokes={jokes}
            clickCount={clickCount}
            categoryJokes={categoryJokes}
            toggleExpanded={toggleExpanded}
            moveToTop={moveToTop}
            loadMoreJokes={loadMoreJokes}
        />
    ), [expanded, jokes, clickCount, categoryJokes, toggleExpanded, moveToTop, loadMoreJokes]);

    // Memoize the header component
    const ListHeaderComponent = useMemo(() => <View style={styles.headerFlatlist} />, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Application</Text>
            </View>
            {
                loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={categories}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#0000ff']}
                            />
                        }
                        renderItem={renderItem}
                        ListHeaderComponent={ListHeaderComponent}
                        keyExtractor={(item) => item}
                        removeClippedSubviews={true}
                        initialNumToRender={10}
                        maxToRenderPerBatch={5}
                        windowSize={5}
                    />
                )
            }
        </View>
    );
};

export default Home;
