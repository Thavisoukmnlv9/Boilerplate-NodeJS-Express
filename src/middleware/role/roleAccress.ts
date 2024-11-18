import { NextFunction, Request, Response } from 'express';
import { tokenPayloadService } from '../../api/users/service';
import { Roles } from '../../api/users/types';


function isRoleAuthorized(userRole: Roles, requiredRoles: Roles[]): boolean {
  return requiredRoles.includes(userRole);
}

export function roleAccess(roles: Roles[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = tokenPayloadService(req);
      const userRole = payload.role as Roles;
      if (!isRoleAuthorized(userRole, roles)) {
        return res
          .status(403)
          .json({ status: 'error',
            message: 'You don\'t have permission' });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred during role validation.',
      });
    }
  };
}
