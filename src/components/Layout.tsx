import { useState } from "react";
import styled from "styled-components";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import {
  FaCog,
  FaList,
  FaSignOutAlt,
  FaClipboard,
  FaBars,
  FaUser,
} from "react-icons/fa";
import { useUserActions } from "hooks/useUserActions";

interface Header {
  title: string;
  icon: JSX.Element;
}

/**
 * Content Banner
 */
const Headers: Record<string, Header> = {
  dashboard: {
    title: "Dashboard",
    icon: <FaCog />,
  },
  pricelist: {
    title: "Pricelist",
    icon: <FaClipboard />,
  },
  members: {
    title: "Members",
    icon: <FaList />,
  },
  member: {
    title: "Profile",
    icon: <FaUser />,
  },
};

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { logout } = useUserActions();
  const { pathname } = useLocation();
  const location = pathname.split("/")[1];
  const header = Headers[location];

  return (
    <>
      <Sidebar show={showSidebar}>
        <SidebarLink to="/dashboard">
          <FaCog /> Dashboard
        </SidebarLink>
        <SidebarLink to="/pricelist">
          <FaClipboard /> Pricelist
        </SidebarLink>
        <SidebarLink to="/members">
          <FaList /> Members
        </SidebarLink>
        <SidebarLogout onClick={() => logout()}>
          <FaSignOutAlt /> Logout
        </SidebarLogout>
      </Sidebar>
      <Main.Content>
        <Main.Overlay
          show={showSidebar}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Main.Header>
          <Main.HeaderH1>
            {header?.icon}
            <span>{header?.title}</span>
          </Main.HeaderH1>
          <Main.SidebarToggle onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars />
          </Main.SidebarToggle>
        </Main.Header>
        <Main.Body>
          <Container>
            <Outlet />
          </Container>
        </Main.Body>
      </Main.Content>
    </>
  );
};

export default Layout;

const Sidebar = styled.aside<{ show: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 250px;
  background-color: var(--color-blue);
  color: var(--color-light-blue);
  z-index: 999;

  @media (max-width: 996px) {
    left: ${({ show }) => (show ? "0px" : "-250px")};
  }
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: var(--color-light-blue);
  border-bottom: 1px solid var(--color-light-blue);
  text-decoration: none;
  width: 100%;

  & svg {
    margin-right: 5px;
  }

  &:hover,
  &.active {
    color: #fff;
    border-color: #fff;
  }
`;

const SidebarLogout = styled.a`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 10px 20px;
  color: var(--color-light-blue);
  cursor: pointer;
  border-top: 1px solid var(--color-light-blue);
  text-decoration: none;
  width: 100%;

  & svg {
    margin-right: 5px;
  }

  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;

const Main = {
  Overlay: styled.div<{ show: boolean }>`
    @media (max-width: 996px) {
      display: ${(props) => (props.show ? "block" : "none")};
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      min-height: 100vh;
      z-index: 998;
      background-color: #000;
      opacity: 0.3;
    }
  `,

  Content: styled.div`
    position: absolute;
    top: 0;
    left: 250px;
    width: calc(100% - 250px);

    @media (max-width: 996px) {
      left: 0px;
      width: 100%;
    }
  `,

  Header: styled.div`
    position: fixed;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 20px 20px;
    background-color: var(--color-light-blue);
    height: 80px;
    width: calc(100% - 250px);
    z-index: 997;

    @media (max-width: 996px) {
      width: 100%;
    }
  `,

  HeaderH1: styled.h1`
    display: flex;
    align-items: baseline;
    color: #fff;
    line-height: 1;

    & svg {
      margin-right: 10px;
    }
  `,

  SidebarToggle: styled.a`
    display: none;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;

    &:hover {
      color: var(--color-blue);
    }

    @media (max-width: 996px) {
      display: flex;
    }
  `,

  Body: styled.div`
    margin-top: 80px;
    padding: 20px;
  `,
};
