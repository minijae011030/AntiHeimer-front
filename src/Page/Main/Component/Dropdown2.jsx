import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

function Dropdown2({selectedUser, setSelectedUser, wardList, setWardList}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <DropDownPicker
          open={open}
          value={selectedUser}
          items={wardList}
          setOpen={setOpen}
          setValue={setSelectedUser}
          setItems={setWardList}
          placeholder={'피보호자'}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdown}
        />
      </View>
    </View>
  );
}

export default Dropdown2;

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    zIndex: 100,
    position: 'static',
    marginBottom: 50,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    width: 120,
  },
  dropdown: {
    borderWidth: 0.2,
  },
});
