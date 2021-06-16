import React from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Divider,
  MenuItem,
  OverflowMenu,
} from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import Constants from 'expo-constants';

const TopBar = ({ onRefresh, onAdd, disabled }) => {
  const [visible, setVisible] = React.useState(false);

  const themeContext = React.useContext(ThemeContext);

  const renderAddButton = () => (
    <>
      <TopNavigationAction
        disabled={disabled ? true : false}
        onPress={onRefresh}
        icon={(props) => <Icon {...props} name="refresh-outline" />}
      />
      <TopNavigationAction
        disabled={disabled ? true : false}
        onPress={onAdd}
        icon={(props) => <Icon {...props} name="edit-2-outline" />}
      />
    </>
  );

  const renderOverFlowIcon = () => (
    <TopNavigationAction
      icon={(props) => <Icon {...props} name="more-vertical" />}
      onPress={() => setVisible(true)}
    />
  );

  const renderOverFlow = () => (
    <>
      <OverflowMenu
        anchor={renderOverFlowIcon}
        visible={visible}
        onBackdropPress={() => setVisible(false)}>
        <MenuItem
          title={themeContext.theme === 'light' ? 'Dark Theme' : 'Light Theme'}
          onPress={themeContext.toggleTheme}
          accessoryLeft={(props) => (
            <Icon
              {...props}
              name={themeContext.theme === 'light' ? 'moon' : 'moon-outline'}
            />
          )}
        />
      </OverflowMenu>
    </>
  );

  return (
    <>
      <TopNavigation
        style={{ marginTop: Constants.statusBarHeight }}
        alignment="center"
        title="Pinion"
        subtitle="Share your opinion"
        accessoryRight={renderAddButton}
        accessoryLeft={renderOverFlow}
      />
      <Divider />
    </>
  );
};

export default TopBar;
