--
-- PostgreSQL database dump
--

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.4 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."character" (
    cid integer NOT NULL,
    name character varying(255),
    age integer
);


ALTER TABLE public."character" OWNER TO postgres;

--
-- Name: character_cid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.character_cid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.character_cid_seq OWNER TO postgres;

--
-- Name: character_cid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.character_cid_seq OWNED BY public."character".cid;


--
-- Name: character cid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."character" ALTER COLUMN cid SET DEFAULT nextval('public.character_cid_seq'::regclass);


--
-- Data for Name: character; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."character" (cid, name, age) FROM stdin;
\.


--
-- Name: character_cid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.character_cid_seq', 2, true);


--
-- PostgreSQL database dump complete
--

