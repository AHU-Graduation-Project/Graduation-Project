import { IRoadmap } from "../../domain/Repositories/IRoadmap";
import axios, { AxiosError } from 'axios';
import useTokenStore from "../../application/state/tokenStore";
import { IconType } from '../../domain/enums/IconType';

export interface CreateRoadmapRequest {
    title: string;
    description: string;
    icon: IconType;
    slug: string;
}

export interface CreateRoadmapResponse {
    roadmap: IRoadmap;
}

export interface CreateRoadmap {
    execute: (params: CreateRoadmapRequest) => Promise<CreateRoadmapResponse>;
}

export function CreateRoadmap(): CreateRoadmap {

    const { token } = useTokenStore();

    return {
        execute: async (params: CreateRoadmapRequest): Promise<CreateRoadmapResponse> => {
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            try {
                const response = await axios.post<CreateRoadmapResponse>(
                    `${import.meta.env.VITE_PATH_API}/roadmaps`,
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    }
                );
                return response.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    const message = error.response?.data?.message || error.message;
                    throw new Error(`Failed to create roadmap: ${message}`);
                }
                throw new Error('An unexpected error occurred while creating roadmap');
            }
        }
    };
}

