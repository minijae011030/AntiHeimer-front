import {StyleSheet, View} from 'react-native';
import Graph from '../Component/Graph';
import Table from '../Component/Table';

function DiagnosisResultInquiryPage() {
  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <Graph />
      </View>
      <Table />
    </View>
  );
}

export default DiagnosisResultInquiryPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 40,
  },

  graphContainer: {
    width: 310,
    height: 350,
    marginBottom: 22,
  },
});
