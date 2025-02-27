import { useQuery, UseQueryOptions } from 'react-query';
import QUERY_KEYS from 'constants/queryKeys';
import networkConnector from 'utils/networkConnector';
import { NetworkId } from 'types/network';
import { Tags } from 'types/markets';

const useTagsQuery = (networkId: NetworkId, options?: UseQueryOptions<Tags>) => {
    return useQuery<Tags>(
        QUERY_KEYS.Tags(networkId),
        async () => {
            const tags: Tags = [];
            const tagsContract = networkConnector.tagsContract;
            if (tagsContract) {
                const allTags = await tagsContract.getAllTags();

                const tagLabels = allTags[0];
                const tagIds = allTags[1];

                tagLabels.forEach((tagLabel: string, index: number) => {
                    tags.push({
                        label: tagLabel,
                        id: Number(tagIds[index]),
                    });
                });
            }

            return tags;
        },
        {
            refetchInterval: 5000,
            ...options,
        }
    );
};

export default useTagsQuery;
