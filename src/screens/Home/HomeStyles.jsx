import { StyleSheet } from 'react-native';

const btnTop = {
    marginLeft: 'auto',
    backgroundColor: '#9DEFF2',
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    paddingHorizontal: 16,
    marginRight: 14
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 5
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 600
    },
    scrollContent: {
        padding: 20,
    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#BBBBBB',
        marginBottom: 20
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 500
    },
    btnTop: {
        ...btnTop,
        backgroundColor: '#9DEFF2',
    },
    btnToTop: {
        ...btnTop,
        backgroundColor: '#F66467',
    },
    toTopText: {
        color: '#FFFFFF'
    },
    cardContent: {
        borderTopWidth: 1,
        borderColor: '#BBBBBB',
        marginTop: 10
    },
    contentItem: {
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderColor: '#BBBBBB',
        paddingVertical: 10
    },
    btnAddMoreData: {
        backgroundColor: '#9DEFF2',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        borderWidth: 1,
    }
});

export default styles;