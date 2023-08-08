import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import {
	BackButton,
	Container,
	Title,
	TopContent,
	QuestionContainer,
	QuestionText,
	AnswerText,
	ExpandIcon,
} from './styles';

import { useNavigation } from '@react-navigation/native';

const questionsData = [
	{
		question: 'Como usar o aplicativo?',
		answer: 'Após criar sua conta, escolha o médico desejado na lista e agende sua consulta selecionando o dia e horário disponíveis.',
	},
	{
		question: 'Qual é o objetivo deste aplicativo?',
		answer: 'Este aplicativo foi criado para permitir que os pacientes agendem consultas médicas de forma conveniente, sem a necessidade de deslocamento físico.',
	},
	{
		question: 'Como posso agendar uma consulta?',
		answer: 'No perfil do médico, navegue até o final da página e clique no botão "Agendar Consulta". Selecione o dia e horário desejados e confirme o agendamento.',
	},
	{
		question: 'É possível realizar pagamentos?',
		answer: 'No momento, o aplicativo não oferece opções de pagamento integradas. Os pagamentos devem ser realizados de acordo com a política da clínica ou do médico.',
	},
];

export function Faq() {
	const navigation = useNavigation();
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const toggleExpand = (index: number) => {
		if (index === expandedIndex) {
			setExpandedIndex(null);
		} else {
			setExpandedIndex(index);
		}
	};

	return (
		<Container>
			<TopContent>
				<BackButton onPress={() => navigation.goBack()}>
					<Feather name="arrow-left" size={24} color="#333" />
				</BackButton>
				<Title>Perguntas Frequentes</Title>
			</TopContent>

			<ScrollView>
				{questionsData.map((item, index) => (
					<QuestionContainer key={index}>
						<View style={{ justifyContent: 'space-between' }}>
							<QuestionText onPress={() => toggleExpand(index)}>
								{item.question}
							</QuestionText>
							<ExpandIcon
								name={
									expandedIndex === index
										? 'chevron-up'
										: 'chevron-down'
								}
								size={24}
								color="#0079ff"
							/>
						</View>
						{expandedIndex === index && (
							<AnswerText>{item.answer}</AnswerText>
						)}
					</QuestionContainer>
				))}
			</ScrollView>
		</Container>
	);
}