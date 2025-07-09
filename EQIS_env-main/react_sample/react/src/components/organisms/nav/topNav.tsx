import * as React from 'react';

import { ManagedFocusFeature } from 'ag-grid-community';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { _axios } from '@/apis/axios';

import Icon from '@/components/atoms/icon';
import Line from '@/components/atoms/line';
import Text from '@/components/atoms/text';

import { ItopNavMenu } from '@/interfaces/menu/topNavMenu';

import _useLogin from '@/modules/customHook/useLogin';
import { _recoilEmployee } from '@/modules/recoil/employee';
import { _recoilLang } from '@/modules/recoil/lang';
import { _recoilMenu } from '@/modules/recoil/menu';

import { getImage } from '@/utils/image';

import jsonData from './TopNav.json';

const TopNav = () => {
    /**
     * 메뉴 하드코딩
     */
    const [menuList] = React.useState(jsonData.data.Menu);

    /**
     * axios
     */
    const axios = _axios();

    /**
     * recoil
     */
    const recoilLang = _recoilLang();
    const recoilEmployee = _recoilEmployee();
    const recoilMenu = _recoilMenu();

    /**
     * customHook
     */
    const useLogin = _useLogin();

    /**
     * useState
     */
    const [supiScrnOrderList, setSupiScrnOrderList] = React.useState<string[]>([]);
    const [topNavMenuMap, setTopNavMenuMap] = React.useState<Map<string, ItopNavMenu[]>>(
        new Map<string, ItopNavMenu[]>(),
    );

    /**
     * useEffect
     */
    React.useEffect(() => {
        const langCodeList: string[] = [];
        recoilLang.langInit(langCodeList);
    }, []);

    React.useEffect(() => {
        if (recoilEmployee.isLogin()) {
            topNavMenuSearch();
        }
    }, [recoilEmployee.isLogin(), recoilLang.langCd]);

    /**
     * event handler
     */
    const handle = {
        changeLang: () => {
            recoilLang.langCd === 'KO' ? recoilLang.changeLangCd('EN') : recoilLang.changeLangCd('KO');
        },

        logout: async () => {
            useLogin.logout();
        },
    };

    /**
     * 메뉴 가져오기
     */
    const topNavMenuSearch = async () => {
        const res = await axios.get('/menu/topNavMenu_search.do', {
            params: {
                langCd: recoilLang.langCd,
            },
        });

        if (res.data) {
            const supiScrnOrderList: string[] = res.data.data.supiScrnOrderList;
            const topNavMenu = res.data.data.topNavMenu;
            const topNavMenuList = res.data.data.topNavMenuList;
            const topNavMenuMap: Map<string, ItopNavMenu[]> = new Map<string, ItopNavMenu[]>();

            // 상위 화면 순서 목록 저장
            setSupiScrnOrderList(supiScrnOrderList);

            // 메뉴 map 저장
            supiScrnOrderList.forEach((supiScrn) => {
                topNavMenuMap.set(supiScrn, topNavMenu[supiScrn]);
            });

            setTopNavMenuMap(topNavMenuMap);

            // 메뉴 list 저장
            recoilMenu.saveTopNavMenuList(topNavMenuList);
        }
    };

    return (
        <Wrapper>
            <Container>
                <Title.Container>
                    <Link to="/home" color="white">
                        <Icon src={getImage('SQIM-LOGO')} />
                    </Link>
                </Title.Container>

                <Menu.Container>
                    {/* <Menu.List>
                        {supiScrnOrderList.map((supiScrn: string) => (
                            <Menu.ListItem key={supiScrn}>
                                <Menu.Text size="small" color="white">
                                    {supiScrn}
                                </Menu.Text>

                                <Menu.SubList>
                                    {topNavMenuMap.has(supiScrn) &&
                                        (topNavMenuMap.get(supiScrn) as ItopNavMenu[]).map(
                                            (topNavMenu: ItopNavMenu) =>
                                                !(
                                                    recoilEmployee.eeB.coScnCd === 'K' &&
                                                    topNavMenu.pathId === '/sriis/tsb/list'
                                                ) && (
                                                    <Menu.SubListItem key={topNavMenu.scrnNm}>
                                                        <Link
                                                            to={topNavMenu.pathId}
                                                            target={
                                                                topNavMenu.pathId === 'sims/nain/worksheet'
                                                                    ? '_blank'
                                                                    : ''
                                                            }
                                                        >
                                                            <Menu.LinkText width="100%" height="100%" color="white">
                                                                {topNavMenu.scrnNm}
                                                            </Menu.LinkText>
                                                        </Link>
                                                    </Menu.SubListItem>
                                                ),
                                        )}
                                </Menu.SubList>
                            </Menu.ListItem>
                        ))}
                    </Menu.List> */}
                    <Menu.List>
                        {menuList.map((menu: any) => (
                            <Menu.ListItem key={menu.scrnNm}>
                                <Menu.Text size="small" color="white">
                                    {menu.scrnNm}
                                </Menu.Text>

                                <Menu.SubList>
                                    {menu.subMenu.map((subMenu: any) => (
                                        <Menu.SubListItem key={subMenu.scrnNm}>
                                            <Link to={subMenu.pathId}>
                                                <Menu.LinkText width="100%" height="100%" color="white">
                                                    {subMenu.scrnNm}
                                                </Menu.LinkText>
                                            </Link>
                                        </Menu.SubListItem>
                                    ))}
                                </Menu.SubList>
                            </Menu.ListItem>
                        ))}
                    </Menu.List>
                </Menu.Container>

                <Setting.Container>
                    <Setting.Contents>
                        <Icon src={getImage('LOGIN')} />
                        <Text size="xsmall" color="white">
                            {recoilEmployee.getName()}
                        </Text>
                        <Text size="xsmall" color="white">
                            님
                        </Text>
                    </Setting.Contents>

                    <Line width={1} height={16} color="gray600" />

                    <Setting.Contents pointer onClick={handle.logout}>
                        <Icon src={getImage('LOGOUT')} />
                        <Text size="xsmall" color="white">
                            로그아웃
                        </Text>
                    </Setting.Contents>

                    <Icon
                        src={recoilLang.langCd === 'KO' ? getImage('KOR') : getImage('ENG')}
                        pointer
                        onClick={handle.changeLang}
                    />
                </Setting.Container>
            </Container>
        </Wrapper>
    );
};

export default TopNav;

const Wrapper = styled.div`
    ${(props) => css`
        min-width: ${props.theme.minWidth};
        background-color: ${props.theme.color.darkGray200};
    `}
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 80px;

    padding: 0 40px;
    margin: 0 auto;

    height: 60px;

    ${(props) => css`
        max-width: ${props.theme.maxWidth};
    `}
`;

const Title = {
    Container: styled.div``,
};

const Menu = {
    Container: styled.div`
        height: 100%;
    `,

    List: styled.ul`
        display: table;
        table-layout: fixed;
        text-align: center;

        height: 100%;
    `,

    ListItem: styled.li`
        display: table-cell;
        vertical-align: middle;

        position: relative;

        width: 186px;

        padding: 0 24px;

        &:hover {
            & > span {
                &::after {
                    background-image: url(${getImage('ARROW-UP')});
                }
            }

            & > ul {
                display: block !important;
            }
        }

        ${(props) => css`
            color: ${props.theme.color.darkGray200};

            &:hover {
                color: ${props.theme.color.black};

                & > span {
                    color: ${props.theme.color.brown300};
                }
            }
        `}
    `,

    Text: styled(Text)`
        position: relative;

        &::after {
            content: '';

            position: absolute;
            right: -24px;

            width: 16px;
            height: 16px;

            background-image: url(${getImage('ARROW-DOWN')});
        }
    `,

    SubList: styled.ul`
        display: none;

        position: absolute;
        left: 0;
        top: 58px;

        z-index: 1000;

        width: 100%;

        ${(props) => css`
            background-color: ${props.theme.color.darkGray200};
        `}
    `,

    SubListItem: styled.li`
        height: 42px;

        ${(props) => css`
            color: ${props.theme.color.darkGray200};

            &:hover {
                background-color: ${props.theme.color.black};

                & > a > span {
                    color: ${props.theme.color.brown300};
                }
            }
        `}
    `,

    LinkText: styled(Text)`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
};

const Setting = {
    Container: styled.div`
        display: flex;
        align-items: center;
        gap: 16px;
    `,

    Contents: styled.div<{ pointer?: boolean }>`
        display: flex;
        align-items: center;
        gap: 8px;

        ${(props) => {
            if (props.pointer) {
                return css`
                    cursor: pointer;
                `;
            }
        }}
    `,
};
