import { useContext } from "react";
import { useFetch } from "../../hooks/custom.hooks";
import { LoadingIcon } from "../icons";
import ComboCheckBoxField from "./ComboCheckBoxField";

interface AddActivitiesFieldProps {
  dataFetchUrl: string;
  contextType: React.Context<{
    context: string[];
    setContext: (newValue: any) => void;
    isFormSent: boolean;
  }>;
  filterData: any[];
}

function ComboCheckBox({
  dataFetchUrl,
  contextType,
  filterData,
}: AddActivitiesFieldProps) {
  const { context, setContext } = useContext(contextType);
  const { data, loading } = useFetch<any[]>(dataFetchUrl, [], false);

  const handleAddData = (event: any, dataId: string) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    setContext((data: string[]) => [...data, dataId]);
  };

  const handleRemoveData = (event: any, dataId: string) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    setContext(context.filter((data: string) => data !== dataId));
  };

  return (
    <div className="w-screen grid place-items-center">
      <div className="bg-white rounded-[20px] grid grid-flow-row w-[calc(50vw-1rem)] h-[calc(25vh-1rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-cerBlue p-2">
        {(loading && <LoadingIcon />) ||
          (data.length > 0 &&
            data.map((data) => {
              if (!filterData?.includes(data.id))
                return (
                  <ComboCheckBoxField
                    key={data.id}
                    dataName={data.name}
                    dataId={data.id}
                    onAdd={handleAddData}
                    onRemove={handleRemoveData}
                    contextType={contextType}
                  />
                );
            })) || (
            <h1 className="place-self-center text-[20px]">
              Sem dados cadastrados
            </h1>
          )}
      </div>
    </div>
  );
}

export default ComboCheckBox;
