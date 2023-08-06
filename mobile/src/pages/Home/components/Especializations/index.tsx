import { useState } from 'react';

import { Text } from '../../../Text';
import { Especialization } from '../../../../types/Especialization';
import { FlatList } from 'react-native';

interface EspecializationProps {
    especializations: Especialization[];
    onSelectEspecialization: (especializationId: string) => Promise<void>;
}

import { EspecializationsContainer } from './styles';

export function Especializations({
	especializations,
	onSelectEspecialization,
}: EspecializationProps) {
	const [selectedEspecialization, setSelectedEspecialization] = useState('');

	function handleSelectEspecialization(especializationId: string) {
		const especialization =
            selectedEspecialization === especializationId
            	? ''
            	: especializationId;

		onSelectEspecialization(especialization);
		setSelectedEspecialization(especialization);
	}

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			data={especializations}
			keyExtractor={(especialization) => especialization.id}
			renderItem={({ item: especialization }) => {
				const isSelected =
                    selectedEspecialization === especialization.id;

				return (
					<EspecializationsContainer
						onPress={() =>
							handleSelectEspecialization(especialization.id)
						}
						style={
							isSelected
								? { backgroundColor: '#0079FF' }
								: { backgroundColor: '#F5F5FF' }
						}
					>
						<Text
							size={14}
							weight="700"
							opacity={isSelected ? 1 : 0.5}
							style={
								isSelected
									? { color: '#FFF' }
									: { color: '#000' }
							}
						>
							{especialization.nome}
						</Text>
					</EspecializationsContainer>
				);
			}}
		/>
	);
}

