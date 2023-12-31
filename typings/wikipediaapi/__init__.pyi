"""
This type stub file was generated by pyright.
"""

import logging
import re
import requests
from collections import defaultdict
from enum import IntEnum
from typing import Any, Dict, List, Optional, Union
from urllib import parse

"""
This type stub file was generated by pyright.
"""
__version__ = ...
USER_AGENT = ...
log = ...
PagesDict = Dict[str, "WikipediaPage"]
class ExtractFormat(IntEnum):
    """Represents extraction format."""
    WIKI = ...
    HTML = ...


class Namespace(IntEnum):
    """
    Represents namespace in Wikipedia

    You can gen list of possible namespaces here:

    * https://en.wikipedia.org/wiki/Wikipedia:Namespace
    * https://en.wikipedia.org/wiki/Wikipedia:Namespace#Programming

    Currently following namespaces are supported:
    """
    MAIN = ...
    TALK = ...
    USER = ...
    USER_TALK = ...
    WIKIPEDIA = ...
    WIKIPEDIA_TALK = ...
    FILE = ...
    FILE_TALK = ...
    MEDIAWIKI = ...
    MEDIAWIKI_TALK = ...
    TEMPLATE = ...
    TEMPLATE_TALK = ...
    HELP = ...
    HELP_TALK = ...
    CATEGORY = ...
    CATEGORY_TALK = ...
    PORTAL = ...
    PORTAL_TALK = ...
    PROJECT = ...
    PROJECT_TALK = ...
    REFERENCE = ...
    REFERENCE_TALK = ...
    BOOK = ...
    BOOK_TALK = ...
    DRAFT = ...
    DRAFT_TALK = ...
    EDUCATION_PROGRAM = ...
    EDUCATION_PROGRAM_TALK = ...
    TIMED_TEXT = ...
    TIMED_TEXT_TALK = ...
    MODULE = ...
    MODULE_TALK = ...
    GADGET = ...
    GADGET_TALK = ...
    GADGET_DEFINITION = ...
    GADGET_DEFINITION_TALK = ...


WikiNamespace = Union[Namespace, int]
def namespace2int(namespace: WikiNamespace) -> int:
    """Converts namespace into integer"""
    ...

RE_SECTION = ...
class Wikipedia:
    """Wikipedia is wrapper for Wikipedia API."""
    def __init__(self, user_agent: str, language: str = ..., extract_format: ExtractFormat = ..., headers: Optional[Dict[str, Any]] = ..., **kwargs) -> None:
        """
        Constructs Wikipedia object for extracting information Wikipedia.

        :param user_agent: HTTP User-Agent used in requests
                https://meta.wikimedia.org/wiki/User-Agent_policy
        :param language: Language mutation of Wikipedia -
                http://meta.wikimedia.org/wiki/List_of_Wikipedias
        :param extract_format: Format used for extractions
                :class:`ExtractFormat` object.
        :param headers:  Headers sent as part of HTTP request
        :param kwargs: Optional parameters used in -
                http://docs.python-requests.org/en/master/api/#requests.request

        Examples:

        * Proxy: ``Wikipedia('foo (merlin@example.com)', proxies={'http': 'http://proxy:1234'})``
        """
        ...
    
    def __del__(self) -> None:
        """Closes session."""
        ...
    
    def page(self, title: str, ns: WikiNamespace = ..., unquote: bool = ...) -> WikipediaPage:
        """
        Constructs Wikipedia page with title `title`.

        Creating `WikipediaPage` object is always the first step for extracting
        any information.

        Example::

            wiki_wiki = wikipediaapi.Wikipedia('en')
            page_py = wiki_wiki.page('Python_(programming_language)')
            print(page_py.title)
            # Python (programming language)

            wiki_hi = wikipediaapi.Wikipedia('hi')

            page_hi_py = wiki_hi.article(
                title='%E0%A4%AA%E0%A4%BE%E0%A4%87%E0%A4%A5%E0%A4%A8',
                unquote=True,
            )
            print(page_hi_py.title)
            # पाइथन

        :param title: page title as used in Wikipedia URL
        :param ns: :class:`WikiNamespace`
        :param unquote: if true it will unquote title
        :return: object representing :class:`WikipediaPage`
        """
        ...
    
    def article(self, title: str, ns: WikiNamespace = ..., unquote: bool = ...) -> WikipediaPage:
        """
        Constructs Wikipedia page with title `title`.

        This function is an alias for :func:`page`

        :param title: page title as used in Wikipedia URL
        :param ns: :class:`WikiNamespace`
        :param unquote: if true it will unquote title
        :return: object representing :class:`WikipediaPage`
        """
        ...
    
    def extracts(self, page: WikipediaPage, **kwargs) -> str:
        """
        Returns summary of the page with respect to parameters

        Parameter `exsectionformat` is taken from `Wikipedia` constructor.

        API Calls for parameters:

        - https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bextracts
        - https://www.mediawiki.org/wiki/Extension:TextExtracts#API

        Example::

            import wikipediaapi
            wiki = wikipediaapi.Wikipedia('en')

            page = wiki.page('Python_(programming_language)')
            print(wiki.extracts(page, exsentences=1))
            print(wiki.extracts(page, exsentences=2))

        :param page: :class:`WikipediaPage`
        :param kwargs: parameters used in API call
        :return: summary of the page

        """
        ...
    
    def info(self, page: WikipediaPage) -> WikipediaPage:
        """
        https://www.mediawiki.org/w/api.php?action=help&modules=query%2Binfo
        https://www.mediawiki.org/wiki/API:Info
        """
        ...
    
    def langlinks(self, page: WikipediaPage, **kwargs) -> PagesDict:
        """
        Returns langlinks of the page with respect to parameters

        API Calls for parameters:

        - https://www.mediawiki.org/w/api.php?action=help&modules=query%2Blanglinks
        - https://www.mediawiki.org/wiki/API:Langlinks

        :param page: :class:`WikipediaPage`
        :param kwargs: parameters used in API call
        :return: links to pages in other languages

        """
        ...
    
    def links(self, page: WikipediaPage, **kwargs) -> PagesDict:
        """
        Returns links to other pages with respect to parameters

        API Calls for parameters:

        - https://www.mediawiki.org/w/api.php?action=help&modules=query%2Blinks
        - https://www.mediawiki.org/wiki/API:Links

        :param page: :class:`WikipediaPage`
        :param kwargs: parameters used in API call
        :return: links to linked pages

        """
        ...
    
    def backlinks(self, page: WikipediaPage, **kwargs) -> PagesDict:
        """
        Returns backlinks from other pages with respect to parameters

        API Calls for parameters:

        - https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bbacklinks
        - https://www.mediawiki.org/wiki/API:Backlinks

        :param page: :class:`WikipediaPage`
        :param kwargs: parameters used in API call
        :return: backlinks from other pages

        """
        ...
    
    def categories(self, page: WikipediaPage, **kwargs) -> PagesDict:
        """
        Returns categories for page with respect to parameters

        API Calls for parameters:

        - https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bcategories
        - https://www.mediawiki.org/wiki/API:Categories

        :param page: :class:`WikipediaPage`
        :param kwargs: parameters used in API call
        :return: categories for page
        """
        ...
    
    def categorymembers(self, page: WikipediaPage, **kwargs) -> PagesDict:
        """
        Returns pages in given category with respect to parameters

        API Calls for parameters:

        - https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bcategorymembers
        - https://www.mediawiki.org/wiki/API:Categorymembers

        :param page: :class:`WikipediaPage`
        :param kwargs: parameters used in API call
        :return: pages in given category
        """
        ...
    


class WikipediaPageSection:
    """WikipediaPageSection represents section in the page."""
    def __init__(self, wiki: Wikipedia, title: str, level: int = ..., text: str = ...) -> None:
        """Constructs WikipediaPageSection."""
        ...
    
    @property
    def title(self) -> str:
        """
        Returns title of the current section.

        :return: title of the current section
        """
        ...
    
    @property
    def level(self) -> int:
        """
        Returns indentation level of the current section.

        :return: indentation level of the current section
        """
        ...
    
    @property
    def text(self) -> str:
        """
        Returns text of the current section.

        :return: text of the current section
        """
        ...
    
    @property
    def sections(self) -> List[WikipediaPageSection]:
        """
        Returns subsections of the current section.

        :return: subsections of the current section
        """
        ...
    
    def section_by_title(self, title: str) -> Optional[WikipediaPageSection]:
        """
        Returns subsections of the current section with given title.

        :param title: title of the subsection
        :return: subsection if it exists
        """
        ...
    
    def full_text(self, level: int = ...) -> str:
        """
        Returns text of the current section as well as all its subsections.

        :param level: indentation level
        :return: text of the current section as well as all its subsections
        """
        ...
    
    def __repr__(self):
        ...
    


class WikipediaPage:
    """
    Represents Wikipedia page.

    Except properties mentioned as part of documentation, there are also
    these properties available:

    * `fullurl` - full URL of the page
    * `canonicalurl` - canonical URL of the page
    * `pageid` - id of the current page
    * `displaytitle` - title of the page to display
    * `talkid` - id of the page with discussion

    """
    ATTRIBUTES_MAPPING = ...
    def __init__(self, wiki: Wikipedia, title: str, ns: WikiNamespace = ..., language: str = ..., url: Optional[str] = ...) -> None:
        ...
    
    def __getattr__(self, name):
        ...
    
    @property
    def language(self) -> str:
        """
        Returns language of the current page.

        :return: language
        """
        ...
    
    @property
    def title(self) -> str:
        """
        Returns title of the current page.

        :return: title
        """
        ...
    
    @property
    def namespace(self) -> int:
        """
        Returns namespace of the current page.

        :return: namespace
        """
        ...
    
    def exists(self) -> bool:
        """
        Returns `True` if the current page exists, otherwise `False`.

        :return: if current page existst or not
        """
        ...
    
    @property
    def summary(self) -> str:
        """
        Returns summary of the current page.

        :return: summary
        """
        ...
    
    @property
    def sections(self) -> List[WikipediaPageSection]:
        """
        Returns all sections of the curent page.

        :return: List of :class:`WikipediaPageSection`
        """
        ...
    
    def section_by_title(self, title: str) -> Optional[WikipediaPageSection]:
        """
        Returns last section of the current page with given `title`.

        :param title: section title
        :return: :class:`WikipediaPageSection`
        """
        ...
    
    def sections_by_title(self, title: str) -> List[WikipediaPageSection]:
        """
        Returns all section of the current page with given `title`.

        :param title: section title
        :return: :class:`WikipediaPageSection`
        """
        ...
    
    @property
    def text(self) -> str:
        """
        Returns text of the current page.

        :return: text of the current page
        """
        ...
    
    @property
    def langlinks(self) -> PagesDict:
        """
        Returns all language links to pages in other languages.

        This is wrapper for:

        * https://www.mediawiki.org/w/api.php?action=help&modules=query%2Blanglinks
        * https://www.mediawiki.org/wiki/API:Langlinks

        :return: :class:`PagesDict`
        """
        ...
    
    @property
    def links(self) -> PagesDict:
        """
        Returns all pages linked from the current page.

        This is wrapper for:

        * https://www.mediawiki.org/w/api.php?action=help&modules=query%2Blinks
        * https://www.mediawiki.org/wiki/API:Links

        :return: :class:`PagesDict`
        """
        ...
    
    @property
    def backlinks(self) -> PagesDict:
        """
        Returns all pages linking to the current page.

        This is wrapper for:

        * https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bbacklinks
        * https://www.mediawiki.org/wiki/API:Backlinks

        :return: :class:`PagesDict`
        """
        ...
    
    @property
    def categories(self) -> PagesDict:
        """
        Returns categories associated with the current page.

        This is wrapper for:

        * https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bcategories
        * https://www.mediawiki.org/wiki/API:Categories

        :return: :class:`PagesDict`
        """
        ...
    
    @property
    def categorymembers(self) -> PagesDict:
        """
        Returns all pages belonging to the current category.

        This is wrapper for:

        * https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bcategorymembers
        * https://www.mediawiki.org/wiki/API:Categorymembers

        :return: :class:`PagesDict`
        """
        ...
    
    def __repr__(self):
        ...
    


