--
-- PostgreSQL database dump
--

-- Dumped from database version 10.0
-- Dumped by pg_dump version 10.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dbarm; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE dbarm IS 'Database ARM RPD';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categorysoftware; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE categorysoftware (
    id integer NOT NULL,
    name character varying(255),
    comment character varying(255)
);


ALTER TABLE categorysoftware OWNER TO postgres;

--
-- Name: categorysoftware_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE categorysoftware_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE categorysoftware_id_seq OWNER TO postgres;

--
-- Name: categorysoftware_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE categorysoftware_id_seq OWNED BY categorysoftware.id;


--
-- Name: competencerpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE competencerpd (
    id integer NOT NULL,
    competencediscbupias character varying(255),
    rpd integer
);


ALTER TABLE competencerpd OWNER TO postgres;

--
-- Name: competencerpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE competencerpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE competencerpd_id_seq OWNER TO postgres;

--
-- Name: competencerpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE competencerpd_id_seq OWNED BY competencerpd.id;


--
-- Name: controltypesemesterrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE controltypesemesterrpd (
    id integer NOT NULL,
    typeofeducationalactivityias character varying(255),
    rpd integer,
    studyperiodias character varying(255)
);


ALTER TABLE controltypesemesterrpd OWNER TO postgres;

--
-- Name: controltypesemesterrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE controltypesemesterrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE controltypesemesterrpd_id_seq OWNER TO postgres;

--
-- Name: controltypesemesterrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE controltypesemesterrpd_id_seq OWNED BY controltypesemesterrpd.id;


--
-- Name: developerrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE developerrpd (
    id integer NOT NULL,
    rpd integer,
    personias character varying(255)
);


ALTER TABLE developerrpd OWNER TO postgres;

--
-- Name: developerrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE developerrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE developerrpd_id_seq OWNER TO postgres;

--
-- Name: developerrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE developerrpd_id_seq OWNED BY developerrpd.id;


--
-- Name: directoryequipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE directoryequipment (
    id integer NOT NULL,
    name character varying(255),
    numberlab character varying(255),
    typeofownership integer,
    numberofseats integer
);


ALTER TABLE directoryequipment OWNER TO postgres;

--
-- Name: directoryequipment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE directoryequipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE directoryequipment_id_seq OWNER TO postgres;

--
-- Name: directoryequipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE directoryequipment_id_seq OWNED BY directoryequipment.id;


--
-- Name: directoryiss; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE directoryiss (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE directoryiss OWNER TO postgres;

--
-- Name: directoryiss_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE directoryiss_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE directoryiss_id_seq OWNER TO postgres;

--
-- Name: directoryiss_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE directoryiss_id_seq OWNED BY directoryiss.id;


--
-- Name: directoryitsinternet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE directoryitsinternet (
    id integer NOT NULL,
    name character varying(255),
    comment character varying(255)
);


ALTER TABLE directoryitsinternet OWNER TO postgres;

--
-- Name: directoryitsinternet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE directoryitsinternet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE directoryitsinternet_id_seq OWNER TO postgres;

--
-- Name: directoryitsinternet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE directoryitsinternet_id_seq OWNED BY directoryitsinternet.id;


--
-- Name: directorylab; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE directorylab (
    id integer NOT NULL,
    name character varying(255),
    departmentias character varying(255),
    numberlub character varying(255),
    area real,
    numberofseats integer
);


ALTER TABLE directorylab OWNER TO postgres;

--
-- Name: directorylab_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE directorylab_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE directorylab_id_seq OWNER TO postgres;

--
-- Name: directorylab_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE directorylab_id_seq OWNED BY directorylab.id;


--
-- Name: directoryumosrs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE directoryumosrs (
    id integer NOT NULL,
    name character varying(255),
    comment character varying(255)
);


ALTER TABLE directoryumosrs OWNER TO postgres;

--
-- Name: directoryumosrs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE directoryumosrs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE directoryumosrs_id_seq OWNER TO postgres;

--
-- Name: directoryumosrs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE directoryumosrs_id_seq OWNED BY directoryumosrs.id;


--
-- Name: disciplineformingcompetence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE disciplineformingcompetence (
    id integer NOT NULL,
    previousdiscipline boolean DEFAULT false,
    afterdiscipline boolean DEFAULT false,
    competenceias character varying(255),
    disciplineias character varying(255),
    rpd integer
);


ALTER TABLE disciplineformingcompetence OWNER TO postgres;

--
-- Name: disciplineformingcompetence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE disciplineformingcompetence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE disciplineformingcompetence_id_seq OWNER TO postgres;

--
-- Name: disciplineformingcompetence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE disciplineformingcompetence_id_seq OWNED BY disciplineformingcompetence.id;


--
-- Name: educationalliterature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE educationalliterature (
    id integer NOT NULL,
    name character varying(255),
    rpd integer,
    typeofliterature integer
);


ALTER TABLE educationalliterature OWNER TO postgres;

--
-- Name: educationalliterature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE educationalliterature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE educationalliterature_id_seq OWNER TO postgres;

--
-- Name: educationalliterature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE educationalliterature_id_seq OWNED BY educationalliterature.id;


--
-- Name: equipmentrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE equipmentrpd (
    id integer NOT NULL,
    directoryequipment integer,
    rpd integer
);


ALTER TABLE equipmentrpd OWNER TO postgres;

--
-- Name: equipmentrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE equipmentrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE equipmentrpd_id_seq OWNER TO postgres;

--
-- Name: equipmentrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE equipmentrpd_id_seq OWNED BY equipmentrpd.id;


--
-- Name: featuretheleveloftraining; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE featuretheleveloftraining (
    id integer NOT NULL,
    description text,
    theleveloftraining integer,
    rpd integer
);


ALTER TABLE featuretheleveloftraining OWNER TO postgres;

--
-- Name: featuretheleveloftraining_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE featuretheleveloftraining_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE featuretheleveloftraining_id_seq OWNER TO postgres;

--
-- Name: featuretheleveloftraining_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE featuretheleveloftraining_id_seq OWNED BY featuretheleveloftraining.id;


--
-- Name: formofcontrol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE formofcontrol (
    id integer NOT NULL,
    name character varying(255),
    comment character varying(255)
);


ALTER TABLE formofcontrol OWNER TO postgres;

--
-- Name: formofcontrol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formofcontrol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE formofcontrol_id_seq OWNER TO postgres;

--
-- Name: formofcontrol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formofcontrol_id_seq OWNED BY formofcontrol.id;


--
-- Name: formofcontrolrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE formofcontrolrpd (
    id integer NOT NULL,
    rpd integer,
    formofcontrol integer
);


ALTER TABLE formofcontrolrpd OWNER TO postgres;

--
-- Name: formofcontrolrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formofcontrolrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE formofcontrolrpd_id_seq OWNER TO postgres;

--
-- Name: formofcontrolrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formofcontrolrpd_id_seq OWNED BY formofcontrolrpd.id;


--
-- Name: issrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE issrpd (
    id integer NOT NULL,
    directoryiss integer,
    rpd integer
);


ALTER TABLE issrpd OWNER TO postgres;

--
-- Name: issrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE issrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE issrpd_id_seq OWNER TO postgres;

--
-- Name: issrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE issrpd_id_seq OWNED BY issrpd.id;


--
-- Name: itsinternetrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE itsinternetrpd (
    id integer NOT NULL,
    directoryitsinternet integer,
    rpd integer
);


ALTER TABLE itsinternetrpd OWNER TO postgres;

--
-- Name: itsinternetrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE itsinternetrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE itsinternetrpd_id_seq OWNER TO postgres;

--
-- Name: itsinternetrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE itsinternetrpd_id_seq OWNED BY itsinternetrpd.id;


--
-- Name: laboratoriesrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE laboratoriesrpd (
    id integer NOT NULL,
    directorylab integer,
    rpd integer
);


ALTER TABLE laboratoriesrpd OWNER TO postgres;

--
-- Name: laboratoriesrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE laboratoriesrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE laboratoriesrpd_id_seq OWNER TO postgres;

--
-- Name: laboratoriesrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE laboratoriesrpd_id_seq OWNED BY laboratoriesrpd.id;


--
-- Name: rpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE rpd (
    id integer NOT NULL,
    name character varying(255),
    version character varying(255),
    comment character varying(255),
    pathpdf character varying(255),
    pathfos character varying(255),
    dateofreport date,
    reportnumber integer,
    arguesperson character varying(255),
    headofuop character varying(255),
    discipline character varying(255),
    faculty character varying(255),
    leaddepartment character varying(255),
    program character varying(255),
    directionofpreparation character varying(255),
    profile character varying(255),
    qualification character varying(255),
    graduatedepartment character varying(255),
    modeofstudy character varying(255),
    course character varying(25),
    creditsze integer,
    totalhourse integer,
    year integer,
    dateofapprovalrup date,
    ordernumberfgos integer,
    dateofapprovalfgos date,
    partofthetrainingcycle character varying(255),
    typeofthetrainingcycle character varying(255)
);


ALTER TABLE rpd OWNER TO postgres;

--
-- Name: rpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE rpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rpd_id_seq OWNER TO postgres;

--
-- Name: rpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rpd_id_seq OWNED BY rpd.id;


--
-- Name: software; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE software (
    id integer NOT NULL,
    name character varying(255),
    licensenumber character varying(255),
    categorysoftware integer,
    licensetype character varying(2044) NOT NULL
);


ALTER TABLE software OWNER TO postgres;

--
-- Name: software_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE software_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE software_id_seq OWNER TO postgres;

--
-- Name: software_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE software_id_seq OWNED BY software.id;


--
-- Name: softwarerpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE softwarerpd (
    id integer NOT NULL,
    software integer,
    rpd integer
);


ALTER TABLE softwarerpd OWNER TO postgres;

--
-- Name: softwarerpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE softwarerpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE softwarerpd_id_seq OWNER TO postgres;

--
-- Name: softwarerpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE softwarerpd_id_seq OWNED BY softwarerpd.id;


--
-- Name: thecontentoftrainingactivities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE thecontentoftrainingactivities (
    id integer NOT NULL,
    serialnumber character varying(255),
    name character varying(255),
    content text,
    typeofeducationalactivityias character varying(255),
    hourse integer,
    theme integer
);


ALTER TABLE thecontentoftrainingactivities OWNER TO postgres;

--
-- Name: thecontentoftrainingactivities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE thecontentoftrainingactivities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE thecontentoftrainingactivities_id_seq OWNER TO postgres;

--
-- Name: thecontentoftrainingactivities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE thecontentoftrainingactivities_id_seq OWNED BY thecontentoftrainingactivities.id;


--
-- Name: theleveloftraining; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE theleveloftraining (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE theleveloftraining OWNER TO postgres;

--
-- Name: theleveloftraining_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE theleveloftraining_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE theleveloftraining_id_seq OWNER TO postgres;

--
-- Name: theleveloftraining_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE theleveloftraining_id_seq OWNED BY theleveloftraining.id;


--
-- Name: theme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE theme (
    id integer NOT NULL,
    serialnumber character varying(255),
    name character varying(255),
    keywords text,
    rpd integer
);


ALTER TABLE theme OWNER TO postgres;

--
-- Name: theme_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE theme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE theme_id_seq OWNER TO postgres;

--
-- Name: theme_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE theme_id_seq OWNED BY theme.id;


--
-- Name: typeofliterature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE typeofliterature (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE typeofliterature OWNER TO postgres;

--
-- Name: typeofliterature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE typeofliterature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE typeofliterature_id_seq OWNER TO postgres;

--
-- Name: typeofliterature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE typeofliterature_id_seq OWNED BY typeofliterature.id;


--
-- Name: typeofownership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE typeofownership (
    id integer NOT NULL,
    name character varying(255),
    comment character varying(255)
);


ALTER TABLE typeofownership OWNER TO postgres;

--
-- Name: typeofownership_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE typeofownership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE typeofownership_id_seq OWNER TO postgres;

--
-- Name: typeofownership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE typeofownership_id_seq OWNED BY typeofownership.id;


--
-- Name: umosrsrpd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE umosrsrpd (
    id integer NOT NULL,
    directoryumosrs integer,
    rpd integer
);


ALTER TABLE umosrsrpd OWNER TO postgres;

--
-- Name: umosrsrpd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE umosrsrpd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE umosrsrpd_id_seq OWNER TO postgres;

--
-- Name: umosrsrpd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE umosrsrpd_id_seq OWNED BY umosrsrpd.id;


--
-- Name: categorysoftware id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY categorysoftware ALTER COLUMN id SET DEFAULT nextval('categorysoftware_id_seq'::regclass);


--
-- Name: competencerpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY competencerpd ALTER COLUMN id SET DEFAULT nextval('competencerpd_id_seq'::regclass);


--
-- Name: controltypesemesterrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY controltypesemesterrpd ALTER COLUMN id SET DEFAULT nextval('controltypesemesterrpd_id_seq'::regclass);


--
-- Name: developerrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY developerrpd ALTER COLUMN id SET DEFAULT nextval('developerrpd_id_seq'::regclass);


--
-- Name: directoryequipment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryequipment ALTER COLUMN id SET DEFAULT nextval('directoryequipment_id_seq'::regclass);


--
-- Name: directoryiss id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryiss ALTER COLUMN id SET DEFAULT nextval('directoryiss_id_seq'::regclass);


--
-- Name: directoryitsinternet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryitsinternet ALTER COLUMN id SET DEFAULT nextval('directoryitsinternet_id_seq'::regclass);


--
-- Name: directorylab id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directorylab ALTER COLUMN id SET DEFAULT nextval('directorylab_id_seq'::regclass);


--
-- Name: directoryumosrs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryumosrs ALTER COLUMN id SET DEFAULT nextval('directoryumosrs_id_seq'::regclass);


--
-- Name: disciplineformingcompetence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY disciplineformingcompetence ALTER COLUMN id SET DEFAULT nextval('disciplineformingcompetence_id_seq'::regclass);


--
-- Name: educationalliterature id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY educationalliterature ALTER COLUMN id SET DEFAULT nextval('educationalliterature_id_seq'::regclass);


--
-- Name: equipmentrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipmentrpd ALTER COLUMN id SET DEFAULT nextval('equipmentrpd_id_seq'::regclass);


--
-- Name: featuretheleveloftraining id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY featuretheleveloftraining ALTER COLUMN id SET DEFAULT nextval('featuretheleveloftraining_id_seq'::regclass);


--
-- Name: formofcontrol id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formofcontrol ALTER COLUMN id SET DEFAULT nextval('formofcontrol_id_seq'::regclass);


--
-- Name: formofcontrolrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formofcontrolrpd ALTER COLUMN id SET DEFAULT nextval('formofcontrolrpd_id_seq'::regclass);


--
-- Name: issrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY issrpd ALTER COLUMN id SET DEFAULT nextval('issrpd_id_seq'::regclass);


--
-- Name: itsinternetrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY itsinternetrpd ALTER COLUMN id SET DEFAULT nextval('itsinternetrpd_id_seq'::regclass);


--
-- Name: laboratoriesrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY laboratoriesrpd ALTER COLUMN id SET DEFAULT nextval('laboratoriesrpd_id_seq'::regclass);


--
-- Name: rpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rpd ALTER COLUMN id SET DEFAULT nextval('rpd_id_seq'::regclass);


--
-- Name: software id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY software ALTER COLUMN id SET DEFAULT nextval('software_id_seq'::regclass);


--
-- Name: softwarerpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY softwarerpd ALTER COLUMN id SET DEFAULT nextval('softwarerpd_id_seq'::regclass);


--
-- Name: thecontentoftrainingactivities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY thecontentoftrainingactivities ALTER COLUMN id SET DEFAULT nextval('thecontentoftrainingactivities_id_seq'::regclass);


--
-- Name: theleveloftraining id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theleveloftraining ALTER COLUMN id SET DEFAULT nextval('theleveloftraining_id_seq'::regclass);


--
-- Name: theme id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme ALTER COLUMN id SET DEFAULT nextval('theme_id_seq'::regclass);


--
-- Name: typeofliterature id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY typeofliterature ALTER COLUMN id SET DEFAULT nextval('typeofliterature_id_seq'::regclass);


--
-- Name: typeofownership id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY typeofownership ALTER COLUMN id SET DEFAULT nextval('typeofownership_id_seq'::regclass);


--
-- Name: umosrsrpd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY umosrsrpd ALTER COLUMN id SET DEFAULT nextval('umosrsrpd_id_seq'::regclass);


--
-- Data for Name: categorysoftware; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY categorysoftware (id, name, comment) FROM stdin;
1	ПримерКатегории1	Пример категории номер 1
\.


--
-- Data for Name: competencerpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY competencerpd (id, competencediscbupias, rpd) FROM stdin;
\.


--
-- Data for Name: controltypesemesterrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY controltypesemesterrpd (id, typeofeducationalactivityias, rpd, studyperiodias) FROM stdin;
\.


--
-- Data for Name: developerrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY developerrpd (id, rpd, personias) FROM stdin;
\.


--
-- Data for Name: directoryequipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY directoryequipment (id, name, numberlab, typeofownership, numberofseats) FROM stdin;
\.


--
-- Data for Name: directoryiss; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY directoryiss (id, name) FROM stdin;
\.


--
-- Data for Name: directoryitsinternet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY directoryitsinternet (id, name, comment) FROM stdin;
\.


--
-- Data for Name: directorylab; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY directorylab (id, name, departmentias, numberlub, area, numberofseats) FROM stdin;
\.


--
-- Data for Name: directoryumosrs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY directoryumosrs (id, name, comment) FROM stdin;
\.


--
-- Data for Name: disciplineformingcompetence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY disciplineformingcompetence (id, previousdiscipline, afterdiscipline, competenceias, disciplineias, rpd) FROM stdin;
\.


--
-- Data for Name: educationalliterature; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY educationalliterature (id, name, rpd, typeofliterature) FROM stdin;
\.


--
-- Data for Name: equipmentrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY equipmentrpd (id, directoryequipment, rpd) FROM stdin;
\.


--
-- Data for Name: featuretheleveloftraining; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY featuretheleveloftraining (id, description, theleveloftraining, rpd) FROM stdin;
\.


--
-- Data for Name: formofcontrol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formofcontrol (id, name, comment) FROM stdin;
\.


--
-- Data for Name: formofcontrolrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formofcontrolrpd (id, rpd, formofcontrol) FROM stdin;
\.


--
-- Data for Name: issrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY issrpd (id, directoryiss, rpd) FROM stdin;
\.


--
-- Data for Name: itsinternetrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY itsinternetrpd (id, directoryitsinternet, rpd) FROM stdin;
\.


--
-- Data for Name: laboratoriesrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY laboratoriesrpd (id, directorylab, rpd) FROM stdin;
\.


--
-- Data for Name: rpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rpd (id, name, version, comment, pathpdf, pathfos, dateofreport, reportnumber, arguesperson, headofuop, discipline, faculty, leaddepartment, program, directionofpreparation, profile, qualification, graduatedepartment, modeofstudy, course, creditsze, totalhourse, year, dateofapprovalrup, ordernumberfgos, dateofapprovalfgos, partofthetrainingcycle, typeofthetrainingcycle) FROM stdin;
\.


--
-- Data for Name: software; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY software (id, name, licensenumber, categorysoftware, licensetype) FROM stdin;
2	Пример 1	1	1	1111-1111-1111-1111
\.


--
-- Data for Name: softwarerpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY softwarerpd (id, software, rpd) FROM stdin;
\.


--
-- Data for Name: thecontentoftrainingactivities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY thecontentoftrainingactivities (id, serialnumber, name, content, typeofeducationalactivityias, hourse, theme) FROM stdin;
\.


--
-- Data for Name: theleveloftraining; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY theleveloftraining (id, name) FROM stdin;
1	знать
2	уметь
3	владеть
\.


--
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY theme (id, serialnumber, name, keywords, rpd) FROM stdin;
\.


--
-- Data for Name: typeofliterature; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY typeofliterature (id, name) FROM stdin;
\.


--
-- Data for Name: typeofownership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY typeofownership (id, name, comment) FROM stdin;
\.


--
-- Data for Name: umosrsrpd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY umosrsrpd (id, directoryumosrs, rpd) FROM stdin;
\.


--
-- Name: categorysoftware_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('categorysoftware_id_seq', 1, false);


--
-- Name: competencerpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('competencerpd_id_seq', 1, false);


--
-- Name: controltypesemesterrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('controltypesemesterrpd_id_seq', 1, false);


--
-- Name: developerrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('developerrpd_id_seq', 1, false);


--
-- Name: directoryequipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('directoryequipment_id_seq', 1, false);


--
-- Name: directoryiss_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('directoryiss_id_seq', 1, false);


--
-- Name: directoryitsinternet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('directoryitsinternet_id_seq', 1, false);


--
-- Name: directorylab_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('directorylab_id_seq', 1, false);


--
-- Name: directoryumosrs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('directoryumosrs_id_seq', 1, false);


--
-- Name: disciplineformingcompetence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('disciplineformingcompetence_id_seq', 1, false);


--
-- Name: educationalliterature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('educationalliterature_id_seq', 1, false);


--
-- Name: equipmentrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('equipmentrpd_id_seq', 1, false);


--
-- Name: featuretheleveloftraining_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('featuretheleveloftraining_id_seq', 1, false);


--
-- Name: formofcontrol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formofcontrol_id_seq', 1, false);


--
-- Name: formofcontrolrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formofcontrolrpd_id_seq', 1, false);


--
-- Name: issrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('issrpd_id_seq', 1, false);


--
-- Name: itsinternetrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('itsinternetrpd_id_seq', 1, false);


--
-- Name: laboratoriesrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('laboratoriesrpd_id_seq', 1, false);


--
-- Name: rpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rpd_id_seq', 1, false);


--
-- Name: software_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('software_id_seq', 2, true);


--
-- Name: softwarerpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('softwarerpd_id_seq', 1, false);


--
-- Name: thecontentoftrainingactivities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('thecontentoftrainingactivities_id_seq', 1, false);


--
-- Name: theleveloftraining_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('theleveloftraining_id_seq', 3, true);


--
-- Name: theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('theme_id_seq', 1, false);


--
-- Name: typeofliterature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('typeofliterature_id_seq', 1, false);


--
-- Name: typeofownership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('typeofownership_id_seq', 1, false);


--
-- Name: umosrsrpd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('umosrsrpd_id_seq', 1, false);


--
-- Name: categorysoftware categorysoftware_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY categorysoftware
    ADD CONSTRAINT categorysoftware_pkey PRIMARY KEY (id);


--
-- Name: competencerpd competencerpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY competencerpd
    ADD CONSTRAINT competencerpd_pkey PRIMARY KEY (id);


--
-- Name: controltypesemesterrpd controltypesemesterrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY controltypesemesterrpd
    ADD CONSTRAINT controltypesemesterrpd_pkey PRIMARY KEY (id);


--
-- Name: developerrpd developerrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY developerrpd
    ADD CONSTRAINT developerrpd_pkey PRIMARY KEY (id);


--
-- Name: directoryequipment directoryequipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryequipment
    ADD CONSTRAINT directoryequipment_pkey PRIMARY KEY (id);


--
-- Name: directoryiss directoryiss_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryiss
    ADD CONSTRAINT directoryiss_pkey PRIMARY KEY (id);


--
-- Name: directoryitsinternet directoryitsinternet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryitsinternet
    ADD CONSTRAINT directoryitsinternet_pkey PRIMARY KEY (id);


--
-- Name: directorylab directorylab_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directorylab
    ADD CONSTRAINT directorylab_pkey PRIMARY KEY (id);


--
-- Name: directoryumosrs directoryumosrs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryumosrs
    ADD CONSTRAINT directoryumosrs_pkey PRIMARY KEY (id);


--
-- Name: disciplineformingcompetence disciplineformingcompetence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY disciplineformingcompetence
    ADD CONSTRAINT disciplineformingcompetence_pkey PRIMARY KEY (id);


--
-- Name: educationalliterature educationalliterature_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY educationalliterature
    ADD CONSTRAINT educationalliterature_pkey PRIMARY KEY (id);


--
-- Name: equipmentrpd equipmentrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipmentrpd
    ADD CONSTRAINT equipmentrpd_pkey PRIMARY KEY (id);


--
-- Name: featuretheleveloftraining featuretheleveloftraining_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY featuretheleveloftraining
    ADD CONSTRAINT featuretheleveloftraining_pkey PRIMARY KEY (id);


--
-- Name: formofcontrol formofcontrol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formofcontrol
    ADD CONSTRAINT formofcontrol_pkey PRIMARY KEY (id);


--
-- Name: formofcontrolrpd formofcontrolrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formofcontrolrpd
    ADD CONSTRAINT formofcontrolrpd_pkey PRIMARY KEY (id);


--
-- Name: issrpd issrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY issrpd
    ADD CONSTRAINT issrpd_pkey PRIMARY KEY (id);


--
-- Name: itsinternetrpd itsinternetrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY itsinternetrpd
    ADD CONSTRAINT itsinternetrpd_pkey PRIMARY KEY (id);


--
-- Name: laboratoriesrpd laboratoriesrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY laboratoriesrpd
    ADD CONSTRAINT laboratoriesrpd_pkey PRIMARY KEY (id);


--
-- Name: rpd rpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rpd
    ADD CONSTRAINT rpd_pkey PRIMARY KEY (id);


--
-- Name: software software_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY software
    ADD CONSTRAINT software_pkey PRIMARY KEY (id);


--
-- Name: softwarerpd softwarerpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY softwarerpd
    ADD CONSTRAINT softwarerpd_pkey PRIMARY KEY (id);


--
-- Name: thecontentoftrainingactivities thecontentoftrainingactivities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY thecontentoftrainingactivities
    ADD CONSTRAINT thecontentoftrainingactivities_pkey PRIMARY KEY (id);


--
-- Name: theleveloftraining theleveloftraining_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theleveloftraining
    ADD CONSTRAINT theleveloftraining_pkey PRIMARY KEY (id);


--
-- Name: theme theme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (id);


--
-- Name: typeofliterature typeofliterature_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY typeofliterature
    ADD CONSTRAINT typeofliterature_pkey PRIMARY KEY (id);


--
-- Name: typeofownership typeofownership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY typeofownership
    ADD CONSTRAINT typeofownership_pkey PRIMARY KEY (id);


--
-- Name: umosrsrpd umosrsrpd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY umosrsrpd
    ADD CONSTRAINT umosrsrpd_pkey PRIMARY KEY (id);


--
-- Name: competencerpd competencerpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY competencerpd
    ADD CONSTRAINT competencerpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: controltypesemesterrpd controltypesemesterrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY controltypesemesterrpd
    ADD CONSTRAINT controltypesemesterrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: developerrpd developerrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY developerrpd
    ADD CONSTRAINT developerrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: directoryequipment directoryequipment_typeofownership_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY directoryequipment
    ADD CONSTRAINT directoryequipment_typeofownership_fkey FOREIGN KEY (typeofownership) REFERENCES typeofownership(id);


--
-- Name: disciplineformingcompetence disciplineformingcompetence_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY disciplineformingcompetence
    ADD CONSTRAINT disciplineformingcompetence_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: educationalliterature educationalliterature_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY educationalliterature
    ADD CONSTRAINT educationalliterature_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: educationalliterature educationalliterature_typeofliterature_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY educationalliterature
    ADD CONSTRAINT educationalliterature_typeofliterature_fkey FOREIGN KEY (typeofliterature) REFERENCES typeofliterature(id);


--
-- Name: equipmentrpd equipmentrpd_directoryequipment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipmentrpd
    ADD CONSTRAINT equipmentrpd_directoryequipment_fkey FOREIGN KEY (directoryequipment) REFERENCES directoryequipment(id);


--
-- Name: equipmentrpd equipmentrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY equipmentrpd
    ADD CONSTRAINT equipmentrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: featuretheleveloftraining featuretheleveloftraining_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY featuretheleveloftraining
    ADD CONSTRAINT featuretheleveloftraining_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: featuretheleveloftraining featuretheleveloftraining_theleveloftraining_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY featuretheleveloftraining
    ADD CONSTRAINT featuretheleveloftraining_theleveloftraining_fkey FOREIGN KEY (theleveloftraining) REFERENCES theleveloftraining(id);


--
-- Name: formofcontrolrpd formofcontrolrpd_formofcontrol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formofcontrolrpd
    ADD CONSTRAINT formofcontrolrpd_formofcontrol_fkey FOREIGN KEY (formofcontrol) REFERENCES formofcontrol(id);


--
-- Name: formofcontrolrpd formofcontrolrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formofcontrolrpd
    ADD CONSTRAINT formofcontrolrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: issrpd issrpd_directoryiss_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY issrpd
    ADD CONSTRAINT issrpd_directoryiss_fkey FOREIGN KEY (directoryiss) REFERENCES directoryiss(id);


--
-- Name: issrpd issrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY issrpd
    ADD CONSTRAINT issrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: itsinternetrpd itsinternetrpd_directoryitsinternet_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY itsinternetrpd
    ADD CONSTRAINT itsinternetrpd_directoryitsinternet_fkey FOREIGN KEY (directoryitsinternet) REFERENCES directoryitsinternet(id);


--
-- Name: itsinternetrpd itsinternetrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY itsinternetrpd
    ADD CONSTRAINT itsinternetrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: laboratoriesrpd laboratoriesrpd_directorylab_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY laboratoriesrpd
    ADD CONSTRAINT laboratoriesrpd_directorylab_fkey FOREIGN KEY (directorylab) REFERENCES directorylab(id);


--
-- Name: laboratoriesrpd laboratoriesrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY laboratoriesrpd
    ADD CONSTRAINT laboratoriesrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: software software_categorysoftware_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY software
    ADD CONSTRAINT software_categorysoftware_fkey FOREIGN KEY (categorysoftware) REFERENCES categorysoftware(id);


--
-- Name: softwarerpd softwarerpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY softwarerpd
    ADD CONSTRAINT softwarerpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: softwarerpd softwarerpd_software_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY softwarerpd
    ADD CONSTRAINT softwarerpd_software_fkey FOREIGN KEY (software) REFERENCES software(id);


--
-- Name: thecontentoftrainingactivities thecontentoftrainingactivities_theme_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY thecontentoftrainingactivities
    ADD CONSTRAINT thecontentoftrainingactivities_theme_fkey FOREIGN KEY (theme) REFERENCES theme(id);


--
-- Name: theme theme_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme
    ADD CONSTRAINT theme_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- Name: umosrsrpd umosrsrpd_directoryumosrs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY umosrsrpd
    ADD CONSTRAINT umosrsrpd_directoryumosrs_fkey FOREIGN KEY (directoryumosrs) REFERENCES directoryumosrs(id);


--
-- Name: umosrsrpd umosrsrpd_rpd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY umosrsrpd
    ADD CONSTRAINT umosrsrpd_rpd_fkey FOREIGN KEY (rpd) REFERENCES rpd(id);


--
-- PostgreSQL database dump complete
--

