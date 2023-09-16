--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clinicas; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.clinicas (
    id uuid NOT NULL,
    "clinicImage" character varying(255),
    nome character varying(250) NOT NULL,
    email character varying(250) NOT NULL,
    senha character varying(255) NOT NULL,
    "CNPJ" character varying(14) NOT NULL,
    cidade character varying(250) NOT NULL,
    estado character varying(100) NOT NULL,
    "CEP" character varying(100) NOT NULL,
    telefone character varying(13) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.clinicas OWNER TO root;

--
-- Name: consulta; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.consulta (
    id uuid NOT NULL,
    data timestamp with time zone NOT NULL,
    hora time without time zone NOT NULL,
    local character varying(250) NOT NULL,
    "idPaciente" uuid NOT NULL,
    "idMedico" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.consulta OWNER TO root;

--
-- Name: especializacaos; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.especializacaos (
    id uuid NOT NULL,
    nome character varying(100) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.especializacaos OWNER TO root;

--
-- Name: historicos; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.historicos (
    id uuid NOT NULL,
    data character varying(255) NOT NULL,
    descricao character varying(500) NOT NULL,
    "idPaciente" uuid NOT NULL,
    "idMedico" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.historicos OWNER TO root;

--
-- Name: medicos; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.medicos (
    id uuid NOT NULL,
    nome character varying(250) NOT NULL,
    sobrenome character varying(250) NOT NULL,
    "CRM" character varying(12) NOT NULL,
    "doctorImage" character varying(255),
    email character varying(100) NOT NULL,
    senha character varying(255) NOT NULL,
    cidade character varying(250) NOT NULL,
    estado character varying(2) NOT NULL,
    "CEP" character varying(100) NOT NULL,
    telefone character varying(13) NOT NULL,
    "idEspecializacao" uuid NOT NULL,
    "idClinica" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idMedico" uuid
);


ALTER TABLE public.medicos OWNER TO root;

--
-- Name: pacientes; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.pacientes (
    id uuid NOT NULL,
    nome character varying(250) NOT NULL,
    sobrenome character varying(250) NOT NULL,
    "patientImage" character varying(255),
    "CPF" character varying(11) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(255) NOT NULL,
    telefone character varying(13) NOT NULL,
    "dataNascimento" timestamp with time zone NOT NULL,
    altura character varying(255),
    peso character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.pacientes OWNER TO root;

--
-- Data for Name: clinicas; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.clinicas (id, "clinicImage", nome, email, senha, "CNPJ", cidade, estado, "CEP", telefone, "createdAt", "updatedAt") FROM stdin;
3804fc00-9286-481c-82b3-6414f80dc755	1688000683910otherClinic.jpg	Clinica Vida	clinicaVida@hotmail.com	$2b$10$kFc5.SXtN4apPBMquf7cIOCqq/i3XfM4H7PU57cFh0TLiUA19bzXW	61561759000138	Barra do Pira├¡	RJ	27140150	2425846345	2023-06-29 00:29:01.694+00	2023-06-29 01:04:44.112+00
\.


--
-- Data for Name: consulta; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.consulta (id, data, hora, local, "idPaciente", "idMedico", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: especializacaos; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.especializacaos (id, nome, "createdAt", "updatedAt") FROM stdin;
7e26e7ce-cc7d-4413-b1ef-f28088a2e6de	Ortopedista	2023-06-29 00:28:47.232+00	2023-06-29 00:28:47.232+00
d1f60ce9-4f92-4744-aa7a-7e0d807e7473	Clinico Geral	2023-06-29 00:31:11.019+00	2023-06-29 00:31:11.019+00
\.


--
-- Data for Name: historicos; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.historicos (id, data, descricao, "idPaciente", "idMedico", "createdAt", "updatedAt") FROM stdin;
3ff412ac-d1fd-4280-81b7-1c9b3233762a	2023-06-28	Paciente apresentou dores de cabe├ºa	46fa0b9b-73c1-49c9-9955-606f81f8dc96	4a78210b-ae32-402c-85ba-7bade07d2842	2023-06-29 01:18:08.654+00	2023-06-29 01:18:08.654+00
\.


--
-- Data for Name: medicos; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.medicos (id, nome, sobrenome, "CRM", "doctorImage", email, senha, cidade, estado, "CEP", telefone, "idEspecializacao", "idClinica", "createdAt", "updatedAt", "idMedico") FROM stdin;
7612fb09-0ad0-404b-a6de-071423477278	Pedro	Silva	000000000000	1687998554649doctor.jpg	pS@hotmail.com	$2b$10$cltPHmpSXOiLaIh7cwo0m.jDx408ge0K/xBvL0wdAmwxYezzOPpm.	Barra do Pira├¡	RJ	27135010	2137745344	7e26e7ce-cc7d-4413-b1ef-f28088a2e6de	3804fc00-9286-481c-82b3-6414f80dc755	2023-06-29 00:29:14.905+00	2023-06-29 00:29:14.905+00	\N
4a78210b-ae32-402c-85ba-7bade07d2842	Antonio Carlos	Vieira	000000000001	1687998722185doctor.jpg	ACV@hotmail.com	$2b$10$7mPz3w7Ge8YLLEFGw5xRNO6Nr7bNL135P7FKswGOdc1hrhwXfWZmq	Barra do Pira├¡	RJ	27135010	2235662132	d1f60ce9-4f92-4744-aa7a-7e0d807e7473	3804fc00-9286-481c-82b3-6414f80dc755	2023-06-29 00:32:02.574+00	2023-06-29 00:32:02.574+00	\N
\.


--
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.pacientes (id, nome, sobrenome, "patientImage", "CPF", email, senha, telefone, "dataNascimento", altura, peso, "createdAt", "updatedAt") FROM stdin;
46fa0b9b-73c1-49c9-9955-606f81f8dc96	Jhon	Doe	1688001090067otherPatient.jpg	42910619788	j.doe@hotmail.com	$2b$10$L1h7Go3Cc1FbHqQc0XrlzOFl.EWJ8tsGjA/1.NQYKL6Z0EQXxGVLC	2234334652	2000-01-01 00:00:00+00	170	60	2023-06-29 01:09:18.922+00	2023-06-29 01:11:30.262+00
\.


--
-- Name: clinicas clinicas_CNPJ_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT "clinicas_CNPJ_key" UNIQUE ("CNPJ");


--
-- Name: clinicas clinicas_CNPJ_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT "clinicas_CNPJ_key1" UNIQUE ("CNPJ");


--
-- Name: clinicas clinicas_CNPJ_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT "clinicas_CNPJ_key2" UNIQUE ("CNPJ");


--
-- Name: clinicas clinicas_CNPJ_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT "clinicas_CNPJ_key3" UNIQUE ("CNPJ");


--
-- Name: clinicas clinicas_CNPJ_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT "clinicas_CNPJ_key4" UNIQUE ("CNPJ");


--
-- Name: clinicas clinicas_email_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_email_key UNIQUE (email);


--
-- Name: clinicas clinicas_email_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_email_key1 UNIQUE (email);


--
-- Name: clinicas clinicas_email_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_email_key2 UNIQUE (email);


--
-- Name: clinicas clinicas_email_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_email_key3 UNIQUE (email);


--
-- Name: clinicas clinicas_email_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_email_key4 UNIQUE (email);


--
-- Name: clinicas clinicas_nome_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nome_key UNIQUE (nome);


--
-- Name: clinicas clinicas_nome_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nome_key1 UNIQUE (nome);


--
-- Name: clinicas clinicas_nome_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nome_key2 UNIQUE (nome);


--
-- Name: clinicas clinicas_nome_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nome_key3 UNIQUE (nome);


--
-- Name: clinicas clinicas_nome_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nome_key4 UNIQUE (nome);


--
-- Name: clinicas clinicas_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_pkey PRIMARY KEY (id);


--
-- Name: clinicas clinicas_telefone_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_telefone_key UNIQUE (telefone);


--
-- Name: clinicas clinicas_telefone_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_telefone_key1 UNIQUE (telefone);


--
-- Name: clinicas clinicas_telefone_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_telefone_key2 UNIQUE (telefone);


--
-- Name: clinicas clinicas_telefone_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_telefone_key3 UNIQUE (telefone);


--
-- Name: clinicas clinicas_telefone_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_telefone_key4 UNIQUE (telefone);


--
-- Name: consulta consulta_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT consulta_pkey PRIMARY KEY (id);


--
-- Name: especializacaos especializacaos_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.especializacaos
    ADD CONSTRAINT especializacaos_pkey PRIMARY KEY (id);


--
-- Name: historicos historicos_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.historicos
    ADD CONSTRAINT historicos_pkey PRIMARY KEY (id);


--
-- Name: medicos medicos_CRM_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_CRM_key" UNIQUE ("CRM");


--
-- Name: medicos medicos_CRM_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_CRM_key1" UNIQUE ("CRM");


--
-- Name: medicos medicos_CRM_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_CRM_key2" UNIQUE ("CRM");


--
-- Name: medicos medicos_CRM_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_CRM_key3" UNIQUE ("CRM");


--
-- Name: medicos medicos_CRM_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_CRM_key4" UNIQUE ("CRM");


--
-- Name: medicos medicos_email_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_email_key UNIQUE (email);


--
-- Name: medicos medicos_email_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_email_key1 UNIQUE (email);


--
-- Name: medicos medicos_email_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_email_key2 UNIQUE (email);


--
-- Name: medicos medicos_email_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_email_key3 UNIQUE (email);


--
-- Name: medicos medicos_email_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_email_key4 UNIQUE (email);


--
-- Name: medicos medicos_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_pkey PRIMARY KEY (id);


--
-- Name: medicos medicos_telefone_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_telefone_key UNIQUE (telefone);


--
-- Name: medicos medicos_telefone_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_telefone_key1 UNIQUE (telefone);


--
-- Name: medicos medicos_telefone_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_telefone_key2 UNIQUE (telefone);


--
-- Name: medicos medicos_telefone_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_telefone_key3 UNIQUE (telefone);


--
-- Name: medicos medicos_telefone_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_telefone_key4 UNIQUE (telefone);


--
-- Name: pacientes pacientes_CPF_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT "pacientes_CPF_key" UNIQUE ("CPF");


--
-- Name: pacientes pacientes_CPF_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT "pacientes_CPF_key1" UNIQUE ("CPF");


--
-- Name: pacientes pacientes_CPF_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT "pacientes_CPF_key2" UNIQUE ("CPF");


--
-- Name: pacientes pacientes_CPF_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT "pacientes_CPF_key3" UNIQUE ("CPF");


--
-- Name: pacientes pacientes_CPF_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT "pacientes_CPF_key4" UNIQUE ("CPF");


--
-- Name: pacientes pacientes_email_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_email_key UNIQUE (email);


--
-- Name: pacientes pacientes_email_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_email_key1 UNIQUE (email);


--
-- Name: pacientes pacientes_email_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_email_key2 UNIQUE (email);


--
-- Name: pacientes pacientes_email_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_email_key3 UNIQUE (email);


--
-- Name: pacientes pacientes_email_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_email_key4 UNIQUE (email);


--
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id);


--
-- Name: pacientes pacientes_telefone_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_telefone_key UNIQUE (telefone);


--
-- Name: pacientes pacientes_telefone_key1; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_telefone_key1 UNIQUE (telefone);


--
-- Name: pacientes pacientes_telefone_key2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_telefone_key2 UNIQUE (telefone);


--
-- Name: pacientes pacientes_telefone_key3; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_telefone_key3 UNIQUE (telefone);


--
-- Name: pacientes pacientes_telefone_key4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_telefone_key4 UNIQUE (telefone);


--
-- Name: consulta consulta_idMedico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT "consulta_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES public.medicos(id) ON UPDATE CASCADE;


--
-- Name: consulta consulta_idPaciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT "consulta_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES public.pacientes(id) ON UPDATE CASCADE;


--
-- Name: historicos historicos_idPaciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.historicos
    ADD CONSTRAINT "historicos_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES public.pacientes(id) ON UPDATE CASCADE;


--
-- Name: medicos medicos_idClinica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_idClinica_fkey" FOREIGN KEY ("idClinica") REFERENCES public.clinicas(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: medicos medicos_idEspecializacao_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_idEspecializacao_fkey" FOREIGN KEY ("idEspecializacao") REFERENCES public.especializacaos(id) ON UPDATE CASCADE;


--
-- Name: medicos medicos_idMedico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT "medicos_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES public.historicos(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

