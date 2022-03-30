export const promiseAllSettled = async (promiseList) => {
  const promiseResultList = await Promise.allSettled(promiseList);
  const [rejected, fulfilled] = promiseResultList.reduce(
    ([rej, ful], promiseResult, index) =>
      promiseResult.status === 'rejected' ? [[...rej, { index, reason: promiseResult.reason }], ful] : [rej, [...ful, { index, value: promiseResult.value }]],
    [[], []]
  );
  return { rejected, fulfilled };
};
