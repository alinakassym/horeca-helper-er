import React from 'react';

// Screens
// jobs screens
import {JobEditScreen} from '../screens/jobs/JobEditScreen';
import {JobsPostScreen} from '../screens/jobs/JobsPostScreen';
import {JobsScreen} from '../screens/jobs/JobsScreen';
// employees screens
import {EmployeesScreen} from '../screens/employees/EmployeesScreen';
import {EmployeeWorkScreen} from '../screens/employees/EmployeeWorkScreen';
// search screens
import {EmployeeScreen} from '../screens/search/EmployeeScreen';
import {FilterScreen} from '../screens/search/FilterScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {WorkInfoScreen} from '../screens/search/WorkInfoScreen';
// messages screens
import {MessagesChatScreen} from '../screens/messages/MessagesChatScreen';
import {MessagesScreen} from '../screens/messages/MessagesScreen';
// profile screens
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ProfileEditScreen} from '../screens/profile/ProfileEditScreen';

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
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#151F47',
          tabBarInactiveTintColor: '#B9C1CA',
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
          component={JobsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => {
              return <IconVacancies color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Employees"
          component={EmployeesScreen}
          options={{
            headerTitle: 'Work history',
            tabBarIcon: ({color}) => {
              return <IconFolder color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => {
              return <IconSearch color={color} size={24} width={3} />;
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            headerShown: false,
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
          component={ProfileScreen}
          options={{
            headerTitle: 'Profile',
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
      screenOptions={screenOptions}
      screenListeners={{
        state: e => {
          console.log('state changed', e.data.state.history);
        },
        blur: e => {
          console.log('blur: ', e);
        },
      }}>
      {/*TABS*/}
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabs" component={TabStack} />
      </Stack.Group>

      {/*JOBS SCREENS*/}
      <Stack.Group>
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
      </Stack.Group>

      {/*EMPLOYEES SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          options={{
            headerTitle: 'Employee Work',
          }}
          name="EmployeeWorkScreen"
          component={EmployeeWorkScreen}
        />
      </Stack.Group>

      {/*SEARCH SCREENS*/}
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
        <Stack.Screen
          options={{headerTitle: 'Work Information', presentation: 'modal'}}
          name="WorkInfo"
          component={WorkInfoScreen}
        />
      </Stack.Group>

      {/*MESSAGES SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          name={'MessagesChatScreen'}
          component={MessagesChatScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>

      {/*PROFILE SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          options={{
            headerTitle: 'Edit profile',
          }}
          name="ProfileEditScreen"
          component={ProfileEditScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
