import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  ItemGridObject,
  ItemsOptionsLayout,
} from "../../components/item-components/";
import { LoadingIcon } from "../../components/icons/index";
import { useFetch } from "../../hooks/custom.hooks";
import { ItemObjectProps } from "../../lib/utils";

function Items() {
  const [fetchUrl, setFetchUrl] = useState<string>("/items?filter=TOY");
  const { data, loading } = useFetch<ItemObjectProps[]>(fetchUrl, []);
  const [itemType, setItemType] = useState<string>("");

  useEffect(() => {
    switch (itemType) {
      case "Brinquedos":
        setFetchUrl("/items?filter=TOY");
        break;
      case "Mobiliário":
        setFetchUrl("/items?filter=ACCESSORY");
        break;
      case "Vestuário":
        setFetchUrl("/items?filter=CLOATHING");
        break;
      case "Alimentação":
        setFetchUrl("/items?filter=FOOD");
        break;
    }
  }, [itemType]);

  return (
    <div className="w-100vw grid items-center justify-center overflow-x-hidden">
      <h1 className="text-center text-[36px] mt-2">UTENSÍLIOS</h1>
      <div className="w-screen flex flex-row h-1/7 justify-center items-center overflow-x-hidden">
        <p className="text-center text-[24px] px-2 ">
          Navegue pelo nosso repositório de utensílios. Nesta seção, você pode
          pesquisar pelos mais diversos itens que auxiliam no processo de
          reabilitação dos nossos pacientes. Utilize os filtros disponíveis para
          alterar o tipo de item que você deseja.
        </p>
      </div>
      <div className="w-screen my-4">
        <ItemsOptionsLayout
          onOptionSelected={(selected: string) => {
            setItemType(selected);
          }}
          autoSelectFirst={true}
        />
      </div>
      <div className="w-screen h-fit flex items-center justify-center md:pl-10 mb-4">
        {loading ? (
          <div className="justify-self-center mt-6">
            <LoadingIcon />
          </div>
        ) : data.length === 0 ? (
          <h1 className="text-[36px] mt-4 text-center">{`Nenhum item do tipo ${itemType} cadastrado.`}</h1>
        ) : (
          <div className="grid md:grid-cols-4 grid-cols-2 w-screen place-items-center gap-4 px-4 mt-10 overflow-x-hidden">
            {data.map((item) => {
              return (
                <ItemGridObject
                  key={item.name}
                  itemData={item}
                  buttonText="saiba mais"
                />
              );
            })}
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Items;
