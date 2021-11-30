import React from 'react';

// Screens
import {JobsScreen} from '../screens/jobs/JobsScreen';
import {EmployeesScreen} from '../screens/employees/EmployeesScreen';
import {JobsPostScreen} from '../screens/jobs/JobsPostScreen';
import {JobEditScreen} from '../screens/jobs/JobEditScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {MessagesScreen} from '../screens/messages/MessagesScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ProfileEditScreen} from '../screens/profile/ProfileEditScreen';
import {FilterScreen} from '../screens/search/FilterScreen';
import {EmployeeScreen} from '../screens/search/EmployeeScreen';
import {EmployeeWorkScreen} from '../screens/employees/EmployeeWorkScreen';
import {WorkInfoScreen} from '../screens/search/WorkInfoScreen';

// Icons
import {IconVacancies} from '../assets/icons/tabs/IconVacancies';
import {IconSearch} from '../assets/icons/tabs/IconSearch';
import {IconMessages} from '../assets/icons/tabs/IconMessages';
import {IconProfile} from '../assets/icons/tabs/IconProfile';
import {IconFolder} from '../assets/icons/tabs/IconFolder';

// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux
import {useSelector} from 'react-redux';

export const Navigator = () => {
  useSelector(state => {
    const {employees} = state;
    return employees.filter;
  });

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const screenOptions = {
    headerTintColor: '#185AB7',
    headerTitleStyle: {
      color: '#333333',
    },
  };

  const JobsScreensStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="JobsMainScreen"
        screenOptions={{...screenOptions, headerTitle: 'My jobs'}}>
        <Stack.Screen
          options={{headerShown: false}}
          name={'JobsMainScreen'}
          component={JobsScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Post a job',
          }}
          name="JobsPostScreen"
          component={JobsPostScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Edit job',
          }}
          name="JobEditScreen"
          component={JobEditScreen}
        />
      </Stack.Navigator>
    );
  };

  const EmployeesScreensStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="EmployeesMainScreen"
        screenOptions={screenOptions}>
        <Stack.Screen
          name={'EmployeesMainScreen'}
          component={EmployeesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Employee Work',
          }}
          name="EmployeeWorkScreen"
          component={EmployeeWorkScreen}
        />
      </Stack.Navigator>
    );
  };

  const SearchScreensStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="SearchMainScreen"
        screenOptions={screenOptions}>
        <Stack.Screen
          name={'SearchMainScreen'}
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Group>
          <Stack.Screen
            options={{
              headerTitle: 'Filters',
            }}
            name="FilterScreen"
            component={FilterScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Profile Information',
            }}
            name="EmployeeScreen"
            component={EmployeeScreen}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            options={{headerTitle: 'Work Information', presentation: 'modal'}}
            name="WorkInfo"
            component={WorkInfoScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

  const MessagesScreensStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="MessagesMainScreen"
        screenOptions={screenOptions}>
        <Stack.Screen
          name={'MessagesMainScreen'}
          component={MessagesScreen}
          options={{headerTitle: 'Messages'}}
        />
      </Stack.Navigator>
    );
  };

  const ProfileScreensStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="MessagesMainScreen"
        screenOptions={screenOptions}>
        <Stack.Screen
          name={'ProfileMainScreen'}
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Edit profile',
          }}
          name="ProfileEditScreen"
          component={ProfileEditScreen}
        />
      </Stack.Navigator>
    );
  };

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Profile"
        screenListeners={{
          state: e => {
            console.log('state changed', e.data.state.history);
          },
          blur: e => {
            console.log('blur: ', e);
          },
        }}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#185AB7',
          tabBarStyle: {
            // note: don't set height, or set screen-specific heights
            marginBottom: 2,
          },
          tabBarBadgeStyle: {
            top: 12,
            left: 0,
          },
        }}>
        <Tab.Screen
          name="Jobs"
          component={JobsScreensStack}
          options={{
            tabBarIcon: ({color}) => {
              return <IconVacancies color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Employees"
          component={EmployeesScreensStack}
          options={{
            tabBarIcon: ({color}) => {
              return <IconFolder color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreensStack}
          options={{
            tabBarIcon: ({color}) => {
              return <IconSearch color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreensStack}
          options={{
            tabBarBadgeStyle: {
              top: 4,
              left: 0,
              backgroundColor: '#E74C3C',
            },
            tabBarBadge: 10,
            tabBarIcon: ({color}) => {
              return <IconMessages color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreensStack}
          options={{
            tabBarIcon: ({color}) => {
              return <IconProfile color={color} size={24} width={1.5} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenListeners={{
        state: e => {
          console.log('state changed', e.data.state.history);
        },
        blur: e => {
          console.log('blur: ', e);
        },
      }}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabs" component={TabStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
