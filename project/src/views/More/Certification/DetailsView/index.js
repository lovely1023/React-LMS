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
import 'src/components/global';
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

const CertificationDetailView = ({ intl }) => {
	const params = useParams();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [certification, setCertification] = useState([]);
	const [flag, setFlag] = React.useState(false);

	const getCertification = useCallback(async () => {
		httpClient.get(`api/more/certification/${params.certificationId}`)
			.then(json => {
				if (json.success && isMountedRef.current) {
					setCertification(json.certificate[0]);
					setFlag(true)
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isMountedRef]);

	useEffect(() => {
		getCertification();
	}, [getCertification]);

	if (!flag) {
		return null;
	}

	return (
		<Page
			className={classes.root}
			title={formatMessage(intl.certificationDetail)}
		>
			<Container maxWidth={"md"}>
				<Header
					goBack
					actualPage={formatMessage(intl.certificationDetail)}
					buttonRight={{
						icon: (<EditIcon />),
						label: formatMessage(intl.edit),
						to: formatMessage(intl.urlCertificationEdit, { certificationId: params.certificationId }),
					}}
				/>
				<Box mt={3}>
					<Details
						certification={certification}
					/>
				</Box>
			</Container>
		</Page>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(CertificationDetailView);
