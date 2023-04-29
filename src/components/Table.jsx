const Table = ({ data, headers, keys }) => {
  return (

        <table className="w-8/12 border-separate border-spacing-y-6 text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-800 uppercase bg-white rounded-md" >
                <tr className="shadow">
                {headers.map((header) => (
                    <th scope="col" className="p-4" key={header}>{header}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                <tr scope="col" className="px-6 py-3 bg-white border-b" key={index}>
                    {keys.map((key) => (
                    <td className="p-4" key={key}>{item[key]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
  
  );
};

export default Table;
