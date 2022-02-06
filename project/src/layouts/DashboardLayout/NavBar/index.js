/* eslint-disable no-use-before-define */
import React, { useEffect, Fragment } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Link,
  List,
  Avatar,
  Drawer,
  Hidden,
  Divider,
  makeStyles,
  Typography,
  ListSubheader,
} from '@material-ui/core';
import {
  Settings as SettingsIcon,
  Globe as GlobeIcon,
  Home as HomeIcon,
} from 'react-feather';
import NavItem from './NavItem';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, intl, language }) => {
  const { user } = useAuth();
  const classes = useStyles();
  const location = useLocation();

  const sections = [
    {
      items: [
        {
          title: formatMessage(intl.students),
          href: formatMessage(intl.urlStudents)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.lessons),
          href: formatMessage(intl.urlLesson)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.bills),
          href: formatMessage(intl.urlBill)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.groups),
          href: formatMessage(intl.urlGroup)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.teachers),
          href: formatMessage(intl.urlTeachers)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.textbooks),
          href: formatMessage(intl.urlTextbooks)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.more),
          href: formatMessage(intl.urlMore),
          items: [
            {
              title: formatMessage(intl.edit),
              href: formatMessage(intl.urlMoreEditTopic),
            },
            {
              title: formatMessage(intl.log),
              href: formatMessage(intl.urlMoreLog),
            },
            {
              title: formatMessage(intl.library),
              href: formatMessage(intl.urlMoreLibrary),
            },
            {
              title: formatMessage(intl.certificates),
              href: formatMessage(intl.urlMoreCertificates),
            },
            {
              title: formatMessage(intl.bell),
              href: formatMessage(intl.urlMoreBell),
            },
            {
              title: formatMessage(intl.users),
              href: formatMessage(intl.urlMoreUsers),
            },
            {
              title: formatMessage(intl.obs),
              href: formatMessage(intl.urlMoreObs),
            },
            {
              title: formatMessage(intl.exams),
              href: formatMessage(intl.urlMoreExams),
            },
            {
              title: formatMessage(intl.contracts),
              href: formatMessage(intl.urlMoreContracts),
            }
          ]
        }
      ]
    },
    // {
    //   items: [
    //     {
    //       roles: ['ADMIN'],
    //       title: formatMessage(intl.user),
    //       href: formatMessage(intl.urlUser)
    //     }
    //   ]
    // },
    // {
    //   items: [
    //     {
    //       roles: ['USER'],
    //       title: formatMessage(intl.license),
    //       href: formatMessage(intl.urlLicense)
    //     }
    //   ]
    // },

  ];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function renderNavItems({
    items,
    pathname,
    depth = 0
  }) {
    return (
      <List disablePadding>
        {items.reduce(
          (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
          []
        )}
      </List>
    );
  }

  function reduceChildRoutes({
    acc,
    item,
    depth,
    pathname,
  }) {
    const key = item.title + depth;

    if (item.roles && !item.roles.includes(user.role)) {
      // The current user does not have the required permissions
      return acc;
    }

    if (item.items) {
      const open = matchPath(pathname, {
        path: item.href,
        exact: false
      });

      acc.push(
        <NavItem
          depth={depth}
          icon={item.icon}
          info={item.info}
          key={key}
          open={Boolean(open)}
          title={item.title}
        >
          {renderNavItems({
            depth: depth + 1,
            pathname,
            items: item.items,
          })}
        </NavItem>
      );
    } else {
      acc.push(
        <NavItem
          key={key}
          depth={depth}
          href={item.href}
          icon={item.icon}
          info={item.info}
          title={item.title}
        />
      );
    }

    return acc;
  }

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo color="true" />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.name}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Your tier:
							{' '}
              <Link
                component={RouterLink}
                to="/pricing"
              >
                {user.tier || 'Normal'}
              </Link>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map((section, index) => {
            return (
              <List
                key={index}
                subheader={(
                  <ListSubheader
                    key={section.subheader}
                    disableGutters
                    disableSticky
                  >
                    {section.subheader}
                  </ListSubheader>
                )}
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            )
          })}
        </Box>
      </PerfectScrollbar>
    </Box>
  );
  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  openMobile: PropTypes.bool,
  onMobileClose: PropTypes.func,
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  language: store.intl.language,
})

export default connectIntl(mapStateToProps)(NavBar);
