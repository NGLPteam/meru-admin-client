import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { RouteHelper } from "routes";
import * as Styled from "./Search.styles";

function Search({
  className,
  routeName,
  darkTheme,
  filtersButton,
  clearOnSubmit,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const { t } = useTranslation();

  const route = routeName ? RouteHelper.findRouteByName(routeName) : null;

  const defaultValue = clearOnSubmit ? "" : router.query?.q || "";

  const onSubmit = (data: Record<string, string>) => {
    router.push({
      pathname: route?.path || router.pathname,
      query: { ...router.query, page: 1, q: data.q },
    });

    if (clearOnSubmit) reset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value && router.query.q) {
      router.push({
        pathname: route?.path || router.pathname,
        query: { ...router.query, page: 1, q: null },
      });
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Styled.SearchWrapper $darkTheme={darkTheme}>
        <Styled.SearchIcon icon="search" className={`${className}__icon`} />
        <Styled.SearchInput
          type="search"
          placeholder={t("common.search")}
          defaultValue={defaultValue}
          {...register("q", { onChange: handleChange })}
        />
        <button className="a-hidden" type="submit">
          {t("search.submit")}
        </button>
        {filtersButton}
      </Styled.SearchWrapper>
    </form>
  );
}

interface Props {
  className?: string;
  routeName?: string;
  darkTheme?: boolean;
  filtersButton?: React.ReactNode;
  clearOnSubmit?: boolean;
}

export default Search;
