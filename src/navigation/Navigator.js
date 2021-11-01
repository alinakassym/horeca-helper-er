import React from 'react';
import {StyleSheet} from 'react-native';

import {JobsScreen} from '../screens/jobs/JobsScreen';
import {JobsPostScreen} from '../screens/jobs/JobsPostScreen';
import {JobEditScreen} from '../screens/jobs/JobEditScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {MessagesScreen} from '../screens/messages/MessagesScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ProfileEditScreen} from '../screens/profile/ProfileEditScreen';
import {FilterScreen} from '../screens/search/FilterScreen';
import {EmployeeScreen} from '../screens/search/EmployeeScreen';

import {IconVacancies} from '../assets/icons/tabs/IconVacancies';
import {IconSearch} from '../assets/icons/tabs/IconSearch';
import {IconNotifications} from '../assets/icons/tabs/IconNotifications';
import {IconProfile} from '../assets/icons/tabs/IconProfile';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useSelector} from 'react-redux';

export const Navigator = () => {
  useSelector(state => state.employees.filter);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

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
          tabBarLabelStyle: {
            bottom: 12,
          },
          tabBarActiveTintColor: '#185AB7',
          tabBarStyle: {
            height: 68,
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
            tabBarLabel: 'My jobs',
            tabBarIcon: ({focused, color}) => {
              return <IconVacancies color={color} size={28} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({focused, color}) => {
              return <IconSearch color={color} size={28} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarLabel: 'Messages',
            tabBarBadgeStyle: {
              top: 8,
              left: 0,
              backgroundColor: '#E74C3C',
            },
            tabBarBadge: 10,
            tabBarIcon: ({focused, color}) => {
              return <IconNotifications color={color} size={28} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused, color}) => {
              return <IconProfile color={color} size={28} width={1.5} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="App"
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
        <Stack.Screen name="Tab" component={TabStack} />
      </Stack.Group>
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
        <Stack.Screen
          options={{
            headerTitle: 'Profile',
          }}
          name="ProfileEditScreen"
          component={ProfileEditScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    width: 54,
    borderRadius: 27,
  },
  shadow: {
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
