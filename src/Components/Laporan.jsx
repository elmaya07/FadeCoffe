import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {getLaporanPenjualan} from '../services/pesanan';
import {useEffect, useState} from 'react';

const colors = ['#4ABFF4', '#79C3DB', '#28B2B3', '#4ADDBA', '#91E3E3'];
const Laporan = () => {
  const [barData, setBarData] = useState([]);

  const fetchLaporan = async () => {
    const response = await getLaporanPenjualan();
    setBarData(
      response.data?.data.map((val, i) => ({
        value: parseFloat(val.data),
        label: val.bulan,
        frontColor: colors[i],
      })),
    );
  };

  useEffect(() => {
    fetchLaporan();
  }, []);
  return (
    <BarChart
      showFractionalValue
      showYAxisIndices
      noOfSections={4}
      //   maxValue={400}
      data={barData}
      isAnimated
    />
  );
};

export default Laporan;
