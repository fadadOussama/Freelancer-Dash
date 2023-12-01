export function mergePageIndexQueryParams(key: string, value: string | number, searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set(key, value as string);

  return newSearchParams.toString();
}

export function mergeSortEmailQueryParams(key: string, value: string, searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  if (key === "sortEmail") {
    newSearchParams.delete("sortProjects");
    newSearchParams.set(key, value);
  } else if (key === "sortProjects") {
    newSearchParams.delete("sortEmail");
    newSearchParams.set(key, value);
  } else if (key === "reset") {
    newSearchParams.delete("sortProjects");
    newSearchParams.delete("sortEmail");
  }

  return newSearchParams.toString();
}

export function mergePageSizeQueryParams(key: string, value: string | number, searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set(key, value as string);

  newSearchParams.set("pageIndex", "0");

  return newSearchParams.toString();
}

export function mergeReferralSourceQueryParams(key: string, value: string | number, searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  if (key !== "reset") {
    newSearchParams.set("pageIndex", "0");
    newSearchParams.set(key, value as string);
  } else {
    newSearchParams.delete("referralSource");
  }

  return newSearchParams.toString();
}

export function mergeNameSearchQueryParams(key: string, value: string | undefined, searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  if (key !== "reset") {
    newSearchParams.set("pageIndex", "0");
    newSearchParams.set(key, value as string);
  } else {
    newSearchParams.delete("nameSearch");
  }

  return newSearchParams.toString();
}

export function projectTypeQueryParams(key: string, value: string | undefined, searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  newSearchParams.set(key, value as string);

  return newSearchParams.toString();
}
