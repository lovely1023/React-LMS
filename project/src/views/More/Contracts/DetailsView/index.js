import React, {
	useCallback,
	useState,
	useEffect
} from 'react';
import {
	Box,
	Container,
	makeStyles
} from '@material-ui/core';
import Details from './Details';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import { Edit as EditIcon } from 'react-feather';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* utils */
import httpClient from 'src/utils/httpClient';
import axios from 'src/utils/axios';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		backgroundColor: theme.palette.background.dark,
	}
}));

const TextbookDetailView = ({ intl }) => {
	const params = useParams();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [textbook, setTextbook] = useState(null);

	const getTextbook = useCallback(async () => {
		try {
			const response = await axios.get(`api/textbook/1`);
			if (isMountedRef.current) {
				setTextbook(response.data.textbook);
				console.log(response.data.textbook)
			}
		} catch (err) {
			console.log(err)
		}
	}, [isMountedRef]);

	useEffect(() => {
		getTextbook();
	}, [getTextbook]);

	if (!textbook) {
		return null;
	}

	return (
		<Page
			className={classes.root}
			title={formatMessage(intl.textbookDetail)}
		>
			<Container maxWidth={"md"}>
				<Header
					goBack
					actualPage={formatMessage(intl.textbookDetail)}
					buttonRight={{
						icon: (<EditIcon />),
						label: formatMessage(intl.edit),
						to: formatMessage(intl.urlTextbookEdit, { textbookId: params.textbookId }),
					}}
				/>
				<Box mt={3}>
					<Details textbook={textbook} />
				</Box>
			</Container>
		</Page>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(TextbookDetailView);
