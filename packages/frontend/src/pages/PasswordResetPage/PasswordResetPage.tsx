/*
 * Copyright (C) 2020 Lewis Mazzei
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Allan Mathew Chacko
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ReactElement } from "react";
import { LogoTemplate, ButtonLink } from "../../components";

import { PasswordResetCard } from "./PasswordResetCard";

/**
 * Allows the user to reset their password by displaying the [[`PasswordResetCard`]] along with the Unifed logo.
 *
 * @internal
 */
export function PasswordResetPage(): ReactElement {
  return (
    <LogoTemplate>
      <PasswordResetCard />
      <ButtonLink
        to="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Return To Login
      </ButtonLink>
    </LogoTemplate>
  );
}
