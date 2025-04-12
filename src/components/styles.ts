import { StyleSheet } from 'react-native';

const btnTop: any = {
    marginLeft: 'auto',
    backgroundColor: '#9DEFF2',
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    paddingHorizontal: 16,
    marginRight: 14,
};

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#BBBBBB',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 500,
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
        color: '#FFFFFF',
    },
    cardContent: {
        borderTopWidth: 1,
        borderColor: '#BBBBBB',
    },
    contentItem: {
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderColor: '#BBBBBB',
        paddingVertical: 10,
    },
    contentItemNoBorder: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    btnAddMoreData: {
        backgroundColor: '#9DEFF2',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        borderWidth: 1,
    },
    textError: {
        color: 'red',
    },
    causedBy: {
        marginTop: 5,
        color: 'gray',
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    modalButton: {
        backgroundColor: '#9DEFF2',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#BBBBBB',
        marginLeft: 'auto',
    },
    modalButtonText: {
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default styles;
