import * as React from 'react';
import {View, Text} from 'react-native';
import {DataTable} from 'react-native-paper';

const numberOfItemsPerPageList = [5];

const Paginator = ({totalRows, setPageComponent}) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, totalRows);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const setP = page => {
    setPage(page);
    setPageComponent(page);
  };

  return (
    <DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(totalRows / numberOfItemsPerPage)}
        onPageChange={setP}
        label={`${from + 1}-${to} of ${totalRows}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        // onItemsPerPageChange={onItemsPerPageChange}
        // selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default Paginator;
